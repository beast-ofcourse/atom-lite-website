import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { docs } from "../lib/docs.ts";

const read = (path) => readFileSync(path, "utf8");

test("build output exists for every route", () => {
  const expected = [
    ".next/server/app/index.html",
    ".next/server/app/docs.html",
    ".next/server/app/_not-found.html",
    ...docs.map((doc) => `.next/server/app/docs/${doc.slug}.html`),
  ];
  for (const path of expected) {
    assert.ok(existsSync(path), `missing build output: ${path}`);
  }
});

test("homepage carries the product pitch, install action, and real proof", () => {
  const html = read(".next/server/app/index.html");
  for (const needle of [
    "atom-lite",
    "Local-first, model-agnostic coding agent for the terminal",
    "npm install -g atom-lite",
    "npx atom-lite",
    "Dark-theme-card.png",
    "Atom-lite-demo.webm",
    "Ten tools",
  ]) {
    assert.ok(html.includes(needle), `homepage missing: ${needle}`);
  }

  const source = read("components/Home.tsx");
  for (const asset of [
    "Dark-theme-card.png",
    "Light-theme-card.png",
    "Atom-lite-demo.webm",
  ]) {
    assert.ok(source.includes(asset), `source missing real asset: ${asset}`);
  }
});

test("header Docs link points to the site docs, not GitHub", () => {
  const source = read("components/Home.tsx");
  assert.ok(source.includes('href="/docs"'), "homepage Docs link must be internal");
  assert.ok(
    !source.includes("github.com/beast-ofcourse/atom-lite/tree/master/docs"),
    "homepage Docs link must not point at repository docs",
  );
  const html = read(".next/server/app/index.html");
  assert.match(html, /href="\/docs"/);
});

test("no invented domain leaks into the built site", () => {
  for (const path of [
    ".next/server/app/index.html",
    ".next/server/app/docs.html",
    "app/sitemap.ts",
    "app/robots.ts",
    "app/layout.tsx",
  ]) {
    assert.ok(!read(path).includes("atom-lite.dev"), `${path}: invented domain`);
  }
});

test("sitemap and robots use the configurable canonical origin", () => {
  const sitemap = read("app/sitemap.ts");
  const robots = read("app/robots.ts");
  for (const source of [sitemap, robots]) {
    assert.match(source, /NEXT_PUBLIC_SITE_URL/);
    assert.match(source, /localhost:3000/);
  }
  assert.match(sitemap, /sitemap/);
  assert.doesNotMatch(sitemap, /atom-lite\.dev/);
});

test("documentation routes render their own headings", () => {
  for (const doc of docs) {
    const html = read(`.next/server/app/docs/${doc.slug}.html`);
    assert.ok(
      html.includes(doc.title.replace(/&/g, "&amp;")),
      `${doc.slug}: missing title`,
    );
    assert.ok(html.includes(doc.intro.slice(0, 40)), `${doc.slug}: missing intro`);
  }
});
