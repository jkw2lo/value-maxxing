// Builds docs/index.html: the read-only portfolio demo (served by GitHub Pages).
//
// It is viewer.html with the reports in samples/*.json baked in as
// window.VM_DEMO. In demo mode the viewer shows those reports, stores nothing
// and turns report generation off (it needs Claude to run).
//
// Run from this folder:  node build-demo.mjs
import { readFileSync, writeFileSync, readdirSync, mkdirSync } from "node:fs";

const here = (p) => new URL(p, import.meta.url);
let html = readFileSync(here("./viewer.html"), "utf8");

const reports = readdirSync(here("./samples/"))
  .filter((f) => f.endsWith(".json"))
  .sort()
  .map((f) => {
    const d = JSON.parse(readFileSync(here("./samples/" + f), "utf8"));
    if (!d.report) throw new Error(`samples/${f} has no "report"`);
    return { expertise: d.expertise || "intermediate", saved_at: d.saved_at || null, report: d.report };
  });

const data = JSON.stringify({ reports }).replace(/</g, "\\u003c");
const marker = '<script>\n(function () {\n  "use strict";';
if (html.split(marker).length !== 2) throw new Error("couldn't find the viewer's main script");
html = html.replace(marker, `<script>window.VM_DEMO = ${data};</script>\n${marker}`);

html = html.replace(/<title>[^<]*<\/title>/, [
  "<title>Value Maxxing · Demo</title>",
  '<meta name="description" content="Value Maxxing researches a product category and tells you what to buy, what to pay and when to buy it. Demo with sample reports.">',
].join("\n"));

mkdirSync(here("./docs/"), { recursive: true });
writeFileSync(here("./docs/index.html"), html);
console.log(`docs/index.html written (${reports.length} sample reports, ${Math.round(Buffer.byteLength(html) / 1024)} KB)`);
