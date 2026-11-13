// Regenerates prompts/*.md and schema/*.schema.json from viewer.html, so the
// copy-paste kit never drifts from the prompts and schema the app really uses.
//
// It evaluates only the prompt and schema code from the viewer's main script
// (no DOM needed), between fixed markers. If a marker moves, it fails loudly.
//
// Run from this folder:  node build-prompts.mjs
import { readFileSync, writeFileSync } from "node:fs";
import vm from "node:vm";

const here = (p) => new URL(p, import.meta.url);
const src = readFileSync(here("./viewer.html"), "utf8");

function slice(startMarker, endMarker) {
  const a = src.indexOf(startMarker);
  const b = src.indexOf(endMarker, a);
  if (a < 0 || b < 0) throw new Error(`marker not found: ${a < 0 ? startMarker : endMarker}`);
  return src.slice(a, b);
}

const code = [
  slice("  var VERDICT_RULES = [", "  // ============================================================\n  // Small SVG chart helpers"),
  slice("  function todayStr() {", "  // ---------- tolerant JSON extraction"),
  'todayStr = function () { return "[TODAY\'S DATE, YYYY-MM-DD]"; };',
  "this.out = { buildResearchPrompt, buildStructurePrompt, PARTS, FULL_SCHEMA, EXPERTISE_NOTE };",
].join("\n");
const ctx = { O: (x) => (x && typeof x === "object" && !Array.isArray(x) ? x : {}), L: (x) => (Array.isArray(x) ? x : []) };
vm.createContext(ctx);
vm.runInContext(code, ctx);
const { buildResearchPrompt, buildStructurePrompt, PARTS, FULL_SCHEMA, EXPERTISE_NOTE } = ctx.out;

const BRIEF_PLACEHOLDER = "[PASTE THE RESEARCH BRIEF HERE — or, if you are in the same chat, replace this with: the research brief you just wrote in your previous message]";
const PASTE_HELP = "Paste into the same chat as step 1 (or any chat — then paste the brief into the marked spot). Replace the [bracketed] bits. Everything below the line is the prompt.";
const withBrief = (s) => s.replace("[PASTE THE RESEARCH BRIEF HERE]", BRIEF_PLACEHOLDER);

// ---- research prompt ----
let research = buildResearchPrompt("[YOUR CATEGORY]", "[OPTIONAL: your situation, budget, use case — or delete this block]", "intermediate")
  .replace(/<reader_expertise>[\s\S]*?<\/reader_expertise>/, "<reader_expertise>[PICK ONE — paste the matching line from the EXPERTISE OPTIONS below]</reader_expertise>");
research = [
  "# Step 1 — Research prompt",
  "",
  "Paste into an AI chat **with web search on**. Replace the [bracketed] bits. Everything below the line is the prompt.",
  "",
  "---",
  "",
  research,
  "",
  "",
  "=== EXPERTISE OPTIONS (delete this section before sending) ===",
  ...Object.keys(EXPERTISE_NOTE).map((k) => `- ${k}: ${EXPERTISE_NOTE[k]}`),
  "",
].join("\n");
writeFileSync(here("./prompts/1-research-prompt.md"), research);

// ---- structuring prompts ----
const full = withBrief(buildStructurePrompt("", false, "full"));
writeFileSync(here("./prompts/2-structure-prompt-all-in-one.md"),
  ["# Step 2 — Structuring prompt (one shot)", "", PASTE_HELP, "", "---", "", full, ""].join("\n"));

buildStructurePrompt("", false, "parts").forEach((p, i) => {
  writeFileSync(here(`./prompts/2-structure-prompt-part${i + 1}.md`), [
    `# Step 2 — Structuring prompt, part ${i + 1} of 3`, "",
    "Use these three if the one-shot prompt gets cut off or errors. Send them one after another and paste all three replies into the viewer.", "",
    PASTE_HELP, "", "---", "", withBrief(p), "",
  ].join("\n"));
});

// ---- schemas ----
const json = (o) => JSON.stringify(o, null, 2) + "\n";
PARTS.forEach((p, i) => writeFileSync(here(`./schema/part${i + 1}.schema.json`), json(p)));
writeFileSync(here("./schema/report.schema.json"), json({
  $schema: "https://json-schema.org/draft/2020-12/schema",
  title: "Value Maxxing report",
  ...FULL_SCHEMA,
}));

console.log("prompts/*.md and schema/*.schema.json written");
