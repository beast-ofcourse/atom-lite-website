import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const home = readFileSync(".next/server/app/index.html", "utf8");
const docs = readFileSync(".next/server/app/docs.html", "utf8");

test("pages declare language and a skip link", () => {
  assert.match(home, /<html[^>]*lang="en"/);
  assert.match(home, /class="skip-link"/);
  assert.match(home, /href="#main"/);
  assert.match(docs, /<html[^>]*lang="en"/);
});

test("every image in the rendered home page has alt text", () => {
  const images = [...home.matchAll(/<img\b[^>]*>/g)].map((match) => match[0]);
  assert.ok(images.length >= 1, "expected a real product image");
  for (const image of images) {
    assert.match(image, /alt="[^"]+"/, `image without alt: ${image.slice(0, 120)}`);
  }
});

test("tabs expose selection, control, and keyboard wiring", () => {
  assert.match(home, /role="tab"/);
  assert.match(home, /aria-controls="session-panel"/);
  assert.match(home, /aria-labelledby="tab-/);
  assert.match(home, /aria-selected="true"/);
});

test("the primary action is named for assistive technology", () => {
  assert.match(home, /id="install-label"/);
  assert.match(home, /aria-describedby="install-label"/);
  assert.match(home, /aria-live="polite"/);
});

test("media and reduced-motion handling are present", () => {
  assert.match(home, /preload="none"/);
  assert.match(home, /aria-label="Real Atom-lite terminal session recording"/);
  const css = readFileSync("app/globals.css", "utf8");
  assert.match(css, /prefers-reduced-motion: reduce/);
});
