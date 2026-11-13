# Step 2 — Structuring prompt, part 2 of 3

Use these three if the one-shot prompt gets cut off or errors. Send them one after another and paste all three replies into the viewer.

Paste into the same chat as step 1 (or any chat — then paste the brief into the marked spot). Replace the [bracketed] bits. Everything below the line is the prompt.

---

You convert a product analysis brief into structured data.

Preserve the analysis exactly — every number, price, threshold, and judgment in the output must come from the brief. You are reformatting, not re-analyzing. Do not soften a conclusion, round a price, invent a product the brief did not name, or fill a field with a plausible guess.

If the brief genuinely does not support a field, use the most conservative honest value: an empty array, a null historical low, a caveat naming the gap. A field marked as unknown is more useful to this reader than a fabricated one.

Two fields need care:

- diminishing_returns.curve: 6-10 points tracing quality (0-100) against normalized unit price, shaped to match the curve the brief describes. It must actually flatten where the brief says the knee is. Label the 2-3 points that correspond to named tiers or the knee itself.

- spec_criteria.weight: relative importance across criteria, summing to roughly 100.

- Units: normalization.unit_short is the singular thing a shopper can count from the package label (pod, oz, sheet, roll, bottle, g) — never "$/x" or "per x". EVERY unit price in the output (normalization.bands, diminishing_returns.curve and knee_unit_price, products.unit_price) is in US dollars per ONE unit_short, so 24.5 cents is 0.245. If the brief normalizes on something that isn't on the label (washes, applications), convert to the label unit and state the conversion in quality_adjustment. products.pack_size is how many unit_short are in the package that street_price buys (102 for a 102-count tub), or null.

- products: one row for EVERY product the brief names, including ones with estimated or missing prices. price_basis is "seen" when the brief cites a price seen at a store or listing during research, "estimate" when it is marked (est.), approximate or from memory, and "unknown" when the brief gives no price (then the price fields are null). A number the brief does not give is null, never 0.

- verdict.signal: use what the brief states. If it states none, apply these rules:
<verdict_rules>
Pick the timing signal with these rules, checked in order. The reference product is the one you would recommend to most readers (best value).
- AVOID_CATEGORY: a different kind of product does the same job clearly better per dollar for most buyers. Say which.
- WAIT_FOR_SALE: its street price today is at least ~15% above its buy-under, and a sale that reaches the buy-under is likely within about 3 months.
- BUY_SELECTIVELY: only when where and what you buy matters more than when, because much of what a shopper will see is risky: counterfeits, misleading labels, reformulated or grey-market stock, or prices that vary wildly by seller.
- BUY_NOW: otherwise. The pick is at or near its buy-under today, or it rarely discounts, so waiting buys little.
Having better and worse products, or recommending specific picks, is NOT a reason for BUY_SELECTIVELY: every report does that.
</verdict_rules>

- recommendation: the brief's YOUR CALL. action is BUY_NOW when today's price is at or under the strike price, WAIT when a sale is worth waiting for, SKIP when it says the category isn't worth buying. product is the exact item and pack size, using the same name as its products row. current_price and strike_price are pack prices for that item; usual_low and usual_high are its usual pack price range when not on sale (null when the brief gives no range); strike_unit_price is the strike per unit_short; retailer is where to buy it. wait_for names the sale or month to wait for (empty unless WAIT). why is one plain sentence. If the brief has no explicit call, take the best-value pick and its buy-under: BUY_NOW if its price today is at or under the buy-under, otherwise WAIT.

- deals_found: only the specific offers the brief says were seen on a store page or listing (DEALS SEEN, or prices it cites with a store). Never an estimate. url only when the brief gives one, else empty. note is a condition such as "Subscribe & Save", "membership required" or "rollback", else empty. Empty array if none were seen.

- awards: leave an award's product and why empty when it doesn't really apply to this category (e.g. longest_lasting for a consumable) rather than repeating another pick.

- price_segments: the brief's price breakdown by segment. dimension is the attribute it segments by, as a shopper would say it ("Total carat weight", "Ply", "Sourcing", "Quality tier"); why is its one-sentence reason. segments are ordered cheapest first. label is the segment name as a shopper would say it ("1 ct", "2-ply", "Organic", "Mid-range"). price_low and price_high are the dollar range for a typical item or common pack in that segment (not per unit); typical_price is what most people pay; unit_price_range is the per-unit range as text ("$0.04–$0.06 / sheet"), or empty. what_you_get is what the money buys over the segment below; best_pick is the best-value product in the segment, using the same name as its products row; watch_out is the main risk at that level. Use null for a number the brief does not give.

- brands: one entry for every brand the brief profiles, plus any brand behind a product row that it doesn't. positioning is a short label ("Store brand", "Premium", "Lab-grown specialist"). summary is one or two sentences on what the brand is and how it's regarded. pros and cons are short phrases true of the brand as a whole. price_range is text ("$900–$4,500"). best_for and verdict are one line each; verdict speaks to a value-maximizing buyer.

- products.segment: the price_segments label the product falls in, spelled exactly as in the brief's segment breakdown; empty if it fits none.

Scores are comparative within this report: quality_score ranks products against each other on the brief's own criteria, value_score ranks quality delivered per dollar. Spread them across the available range — if everything scores 70-80 the chart tells the reader nothing.

Plain language: the reader never sees the brief, so never mention "the brief", "the author" or "the analysis". Say "sweet spot", never "knee". When a fact is unknown, leave the text field empty (or say so once in caveats) instead of writing filler like "unknown", "not stated", "unconfirmed", "N/A" or a bare "(est.)". Mark an estimated number as "~$12", not with "(est.)".

Be complete in coverage and tight in wording. Include EVERY product, trap, spec, tier and sale event the brief names; never drop items to save space. Within each item, write for a skimmer: the shortest wording that keeps the facts, usually one sentence, never more than two. Headline, award "why", best_for and verdict lines: under 25 words. Pros, cons, must-haves and items: short phrases, not sentences. Keep every number, price and qualifier from the brief; cut filler, repetition across fields, and hedges.

THIS IS PART 2 OF 3. For this pass, extract ONLY: the ranked spec criteria with weights, the marketing-noise/reality pairs, the value traps, the market tiers, the expert/community consensus, the price breakdown by segment, and the brand profiles. Ignore the verdict, products, purchase paths, and sources — those are handled in separate passes.

Output rules:
- Reply with ONE valid JSON object inside a single ```json code block, and nothing else — no introduction, no commentary afterwards.
- Follow the schema exactly: every listed key is required, and no extra keys are allowed.
- Numbers must be plain JSON numbers (9.49, not "$9.49"). A price the brief doesn't give is null, never 0.
- generated_at is today's date: [TODAY'S DATE, YYYY-MM-DD].
- Never abbreviate with "..." or comments. If you are running out of room, stop and tell me so instead of cutting the JSON off.

<schema>
{
 "type": "object",
 "properties": {
  "spec_criteria": {
   "type": "array",
   "items": {
    "type": "object",
    "properties": {
     "spec": {
      "type": "string"
     },
     "weight": {
      "type": "number"
     },
     "what_good_looks_like": {
      "type": "string"
     },
     "how_to_check": {
      "type": "string"
     },
     "why_it_matters": {
      "type": "string"
     }
    },
    "required": [
     "spec",
     "weight",
     "what_good_looks_like",
     "how_to_check",
     "why_it_matters"
    ],
    "additionalProperties": false
   }
  },
  "marketing_noise": {
   "type": "array",
   "items": {
    "type": "object",
    "properties": {
     "claim": {
      "type": "string"
     },
     "reality": {
      "type": "string"
     }
    },
    "required": [
     "claim",
     "reality"
    ],
    "additionalProperties": false
   }
  },
  "value_traps": {
   "type": "array",
   "items": {
    "type": "object",
    "properties": {
     "trap": {
      "type": "string"
     },
     "why_it_looks_good": {
      "type": "string"
     },
     "why_it_isnt": {
      "type": "string"
     },
     "instead": {
      "type": "string"
     }
    },
    "required": [
     "trap",
     "why_it_looks_good",
     "why_it_isnt",
     "instead"
    ],
    "additionalProperties": false
   }
  },
  "tiers": {
   "type": "array",
   "items": {
    "type": "object",
    "properties": {
     "tier": {
      "type": "string"
     },
     "price_range": {
      "type": "string"
     },
     "unit_price_range": {
      "type": "string"
     },
     "who_its_for": {
      "type": "string"
     },
     "representative_brands": {
      "type": "array",
      "items": {
       "type": "string"
      }
     },
     "verdict": {
      "type": "string"
     }
    },
    "required": [
     "tier",
     "price_range",
     "unit_price_range",
     "who_its_for",
     "representative_brands",
     "verdict"
    ],
    "additionalProperties": false
   }
  },
  "consensus": {
   "type": "object",
   "properties": {
    "expert_view": {
     "type": "string"
    },
    "community_view": {
     "type": "string"
    },
    "where_they_disagree": {
     "type": "string"
    }
   },
   "required": [
    "expert_view",
    "community_view",
    "where_they_disagree"
   ],
   "additionalProperties": false
  },
  "price_segments": {
   "type": "object",
   "properties": {
    "dimension": {
     "type": "string"
    },
    "why": {
     "type": "string"
    },
    "segments": {
     "type": "array",
     "items": {
      "type": "object",
      "properties": {
       "label": {
        "type": "string"
       },
       "price_low": {
        "type": [
         "number",
         "null"
        ]
       },
       "price_high": {
        "type": [
         "number",
         "null"
        ]
       },
       "typical_price": {
        "type": [
         "number",
         "null"
        ]
       },
       "unit_price_range": {
        "type": "string"
       },
       "what_you_get": {
        "type": "string"
       },
       "best_pick": {
        "type": "string"
       },
       "watch_out": {
        "type": "string"
       }
      },
      "required": [
       "label",
       "price_low",
       "price_high",
       "typical_price",
       "unit_price_range",
       "what_you_get",
       "best_pick",
       "watch_out"
      ],
      "additionalProperties": false
     }
    }
   },
   "required": [
    "dimension",
    "why",
    "segments"
   ],
   "additionalProperties": false
  },
  "brands": {
   "type": "array",
   "items": {
    "type": "object",
    "properties": {
     "brand": {
      "type": "string"
     },
     "positioning": {
      "type": "string"
     },
     "summary": {
      "type": "string"
     },
     "pros": {
      "type": "array",
      "items": {
       "type": "string"
      }
     },
     "cons": {
      "type": "array",
      "items": {
       "type": "string"
      }
     },
     "price_range": {
      "type": "string"
     },
     "best_for": {
      "type": "string"
     },
     "verdict": {
      "type": "string"
     }
    },
    "required": [
     "brand",
     "positioning",
     "summary",
     "pros",
     "cons",
     "price_range",
     "best_for",
     "verdict"
    ],
    "additionalProperties": false
   }
  }
 },
 "required": [
  "spec_criteria",
  "marketing_noise",
  "value_traps",
  "tiers",
  "consensus",
  "price_segments",
  "brands"
 ],
 "additionalProperties": false
}
</schema>

<brief>
[PASTE THE RESEARCH BRIEF HERE — or, if you are in the same chat, replace this with: the research brief you just wrote in your previous message]
</brief>
