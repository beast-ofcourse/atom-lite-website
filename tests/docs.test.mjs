import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { docs, docGroups, getDoc } from "../lib/docs.ts";

test("documentation mirrors the published Atom-lite docs", () => {
  assert.equal(docs.length, 14);
  const slugs = docs.map((doc) => doc.slug);
  assert.equal(new Set(slugs).size, slugs.length, "slugs must be unique");
  assert.deepEqual(slugs, [
    "install",
    "quickstart",
    "cli",
    "commands",
    "tools",
    "sessions",
    "goals",
    "safety",
    "config",
    "providers",
    "agents",
    "extensions",
    "web",
    "troubleshooting",
  ]);
  assert.deepEqual(
    docGroups.map((group) => group.title),
    ["Get started", "Use", "Customize", "Reference"],
  );
  assert.equal(docGroups.flatMap((group) => group.docs).length, docs.length);
});

test("every doc page has a title, source, intro, and real sections", () => {
  for (const doc of docs) {
    assert.ok(doc.title.length >= 2, `${doc.slug}: title`);
    assert.match(doc.source, /^docs\/[\w-]+\.md$/, `${doc.slug}: source`);
    assert.ok(doc.intro.length > 40, `${doc.slug}: intro`);
    assert.ok(doc.sections.length >= 2, `${doc.slug}: sections`);
    for (const section of doc.sections) {
      assert.ok(section.heading.length >= 2, `${doc.slug}: section heading`);
      assert.ok(
        section.body?.length || section.list?.length || section.code,
        `${doc.slug}: ${section.heading} has content`,
      );
    }
  }
});

test("docs avoid invented claims", () => {
  const text = JSON.stringify(docs).toLowerCase();
  for (const forbidden of [
    "testimonial",
    "customer stories",
    "pricing",
    "trusted by",
    "users worldwide",
  ]) {
    assert.ok(!text.includes(forbidden), `must not contain "${forbidden}"`);
  }
});

test("published docs never reference private ADRs", () => {
  for (const file of ["lib/docs.ts", "app/docs/page.tsx", "app/docs/layout.tsx"]) {
    const source = readFileSync(file, "utf8");
    assert.ok(!/\/adr\b|ADRs|docs\/adr/.test(source), `${file}: ADR reference`);
  }
});

test("getDoc resolves known pages and rejects unknown ones", () => {
  assert.equal(getDoc("tools")?.title, "Tools");
  assert.equal(getDoc("not-a-page"), undefined);
});

test("built-in tools page lists all ten tools", () => {
  const tools = getDoc("tools");
  const list = tools.sections.find((s) => s.heading === "The catalogue").list;
  for (const name of [
    "read",
    "write",
    "edit",
    "bash",
    "grep",
    "glob",
    "webfetch",
    "websearch",
    "task",
    "todo",
  ]) {
    assert.ok(list.some((item) => item.startsWith(`${name} —`)), `missing ${name}`);
  }
});
