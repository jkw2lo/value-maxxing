// Builds artifact.html (the published Claude Artifact) from viewer.html.
//
// viewer.html is a complete document so it also works opened as a local
// file. The Artifact host wraps the page in its own <!doctype>/<head>/<body>,
// so the published file is a fragment: title + meta first, then the early
// theme script and the stylesheet, then the body content and scripts.
//
// Run from this folder:  node build-artifact.mjs
import { readFileSync, writeFileSync } from "node:fs";

const src = readFileSync(new URL("./viewer.html", import.meta.url), "utf8");
const head = src.slice(src.indexOf("<head>") + 6, src.indexOf("</head>"));
const body = src.slice(src.indexOf("<body>") + 6, src.lastIndexOf("</body>"));

// Keep the head's scripts and styles; the host supplies charset and viewport.
const headKeep = head.slice(head.indexOf("<script>")).trim();

const out = [
  "<title>Value Maxxing</title>",
  '<meta name="claude:viewport-fit-sides" content="cover">',
  headKeep,
  body.trim(),
  "",
].join("\n");

// The export code builds whole documents inside script strings; only markup
// outside <script> must be free of document-level tags.
const markupOnly = out.replace(/<script>[\s\S]*?<\/script>/g, "");
for (const bad of [/<!doctype/i, /<html[\s>]/i, /<head[\s>]/i, /<body[\s>]/i]) {
  if (bad.test(markupOnly)) throw new Error(`artifact.html still contains ${bad} outside a script`);
}
if (out.indexOf("<title>") > 8000) throw new Error("<title> must be in the first 8KB");

writeFileSync(new URL("./artifact.html", import.meta.url), out);
console.log(`artifact.html written (${Math.round(Buffer.byteLength(out) / 1024)} KB)`);
