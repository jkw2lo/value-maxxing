# Step 2 — Structuring prompt, part 3 of 3

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

- verdict.signal: use what the brief states. If it states none, apply these rules (ignore the instructions about writing the brief):
<verdict_rules>
Pick the timing signal with these rules, checked in order. The reference product is the one you would recommend to most readers (best value).
- AVOID_CATEGORY: a different kind of product does the same job clearly better per dollar for most buyers. Say which.
- WAIT_FOR_SALE: its street price today is at least ~15% above its buy-under, and a sale that reaches the buy-under is likely within about 3 months.
- BUY_SELECTIVELY: only when where and what you buy matters more than when, because much of what a shopper will see is risky: counterfeits, misleading labels, reformulated or grey-market stock, or prices that vary wildly by seller.
- BUY_NOW: otherwise. The pick is at or near its buy-under today, or it rarely discounts, so waiting buys little.
Having better and worse products, or recommending specific picks, is NOT a reason for BUY_SELECTIVELY: every report does that.
State the signal and the rule that decided it in one sentence.
</verdict_rules>

<your_call>
End the brief with YOUR CALL, two parts a shopper can act on today:
1. STRIKE PRICE: the pack price (and the price per unit) at or below which to buy your recommended item.
2. BUY NOW or WAIT: either buy a specific item now (exact product and pack size, the store, today's price) because it is at or under its strike price, or wait (today's price, the strike price, and which sale or month is likely to get there). If the category isn't worth buying, say what to buy instead.
Then list DEALS SEEN: specific current offers you actually saw on a store page or listing during research (product and pack size, store, price, link, any condition such as a coupon, membership or subscription). List only offers you saw; if you saw none, write "none seen".
</your_call>

- recommendation: the brief's YOUR CALL. action is BUY_NOW when it says to buy a specific item today, WAIT when it says to hold out for a lower price, SKIP when it says the category isn't worth buying. product is the exact item and pack size, using the same name as its products row. current_price and strike_price are pack prices for that item; strike_unit_price is the strike per unit_short; retailer is where to buy it. wait_for names the sale or month to wait for (empty unless WAIT). why is one plain sentence. If the brief has no explicit call, take the best-value pick and its buy-under: BUY_NOW if its price today is at or under the buy-under, otherwise WAIT.

- deals_found: only the specific offers the brief says were seen on a store page or listing (DEALS SEEN, or prices it cites with a store). Never an estimate. url only when the brief gives one, else empty. note is a condition such as "Subscribe & Save", "membership required" or "rollback", else empty. Empty array if none were seen.

- awards: leave an award's product and why empty when it doesn't really apply to this category (e.g. longest_lasting for a consumable) rather than repeating another pick.

Scores are comparative within this report: quality_score ranks products against each other on the brief's own criteria, value_score ranks quality delivered per dollar. Spread them across the available range — if everything scores 70-80 the chart tells the reader nothing.

Plain language: the reader never sees the brief, so never mention "the brief", "the author" or "the analysis". Say "sweet spot", never "knee". When a fact is unknown, leave the text field empty (or say so once in caveats) instead of writing filler like "unknown", "not stated", "unconfirmed", "N/A" or a bare "(est.)". Mark an estimated number as "~$12", not with "(est.)".

Be complete in coverage and tight in wording. Include EVERY product, trap, spec, tier and sale event the brief names; never drop items to save space. Within each item, write for a skimmer: the shortest wording that keeps the facts, usually one sentence, never more than two. Headline, award "why", best_for and verdict lines: under 25 words. Pros, cons, must-haves and items: short phrases, not sentences. Keep every number, price and qualifier from the brief; cut filler, repetition across fields, and hedges.

THIS IS PART 3 OF 3. For this pass, extract ONLY: the full list of named products with prices and scores, deal intelligence (volatility, sale cadence, timing), the named purchase paths with itemized costs, the specific deals seen, the caveats, and the sources. Ignore the verdict, normalization, and spec criteria — those are handled in separate passes.

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
  "products": {
   "type": "array",
   "items": {
    "type": "object",
    "properties": {
     "name": {
      "type": "string"
     },
     "brand": {
      "type": "string"
     },
     "tier": {
      "type": "string"
     },
     "price_basis": {
      "type": "string",
      "enum": [
       "seen",
       "estimate",
       "unknown"
      ]
     },
     "street_price": {
      "type": [
       "number",
       "null"
      ]
     },
     "pack_size": {
      "type": [
       "number",
       "null"
      ]
     },
     "unit_price": {
      "type": [
       "number",
       "null"
      ]
     },
     "quality_score": {
      "type": "number"
     },
     "value_score": {
      "type": "number"
     },
     "historical_low": {
      "type": [
       "number",
       "null"
      ]
     },
     "typical_sale": {
      "type": "string"
     },
     "buy_under": {
      "type": [
       "number",
       "null"
      ]
     },
     "where_to_buy": {
      "type": "array",
      "items": {
       "type": "string"
      }
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
     "best_for": {
      "type": "string"
     }
    },
    "required": [
     "name",
     "brand",
     "tier",
     "price_basis",
     "street_price",
     "pack_size",
     "unit_price",
     "quality_score",
     "value_score",
     "historical_low",
     "typical_sale",
     "buy_under",
     "where_to_buy",
     "pros",
     "cons",
     "best_for"
    ],
    "additionalProperties": false
   }
  },
  "deal_intelligence": {
   "type": "object",
   "properties": {
    "volatility": {
     "type": "string"
    },
    "sale_cadence": {
     "type": "array",
     "items": {
      "type": "object",
      "properties": {
       "event": {
        "type": "string"
       },
       "timing": {
        "type": "string"
       },
       "typical_depth": {
        "type": "string"
       }
      },
      "required": [
       "event",
       "timing",
       "typical_depth"
      ],
      "additionalProperties": false
     }
    },
    "best_time_to_buy": {
     "type": "string"
    },
    "patience_payoff": {
     "type": "string"
    },
    "discount_honesty": {
     "type": "string"
    }
   },
   "required": [
    "volatility",
    "sale_cadence",
    "best_time_to_buy",
    "patience_payoff",
    "discount_honesty"
   ],
   "additionalProperties": false
  },
  "purchase_paths": {
   "type": "array",
   "items": {
    "type": "object",
    "properties": {
     "name": {
      "type": "string"
     },
     "goal": {
      "type": "string"
     },
     "total_cost": {
      "type": [
       "number",
       "null"
      ]
     },
     "items": {
      "type": "array",
      "items": {
       "type": "object",
       "properties": {
        "item": {
         "type": "string"
        },
        "price": {
         "type": [
          "number",
          "null"
         ]
        },
        "why": {
         "type": "string"
        }
       },
       "required": [
        "item",
        "price",
        "why"
       ],
       "additionalProperties": false
      }
     },
     "rationale": {
      "type": "string"
     },
     "tradeoff": {
      "type": "string"
     }
    },
    "required": [
     "name",
     "goal",
     "total_cost",
     "items",
     "rationale",
     "tradeoff"
    ],
    "additionalProperties": false
   }
  },
  "deals_found": {
   "type": "array",
   "items": {
    "type": "object",
    "properties": {
     "product": {
      "type": "string"
     },
     "retailer": {
      "type": "string"
     },
     "price": {
      "type": "number"
     },
     "pack_size": {
      "type": [
       "number",
       "null"
      ]
     },
     "url": {
      "type": "string"
     },
     "note": {
      "type": "string"
     }
    },
    "required": [
     "product",
     "retailer",
     "price",
     "pack_size",
     "url",
     "note"
    ],
    "additionalProperties": false
   }
  },
  "caveats": {
   "type": "array",
   "items": {
    "type": "string"
   }
  },
  "sources": {
   "type": "array",
   "items": {
    "type": "object",
    "properties": {
     "title": {
      "type": "string"
     },
     "url": {
      "type": "string"
     }
    },
    "required": [
     "title",
     "url"
    ],
    "additionalProperties": false
   }
  }
 },
 "required": [
  "products",
  "deal_intelligence",
  "purchase_paths",
  "deals_found",
  "caveats",
  "sources"
 ],
 "additionalProperties": false
}
</schema>

<brief>
[PASTE THE RESEARCH BRIEF HERE — or, if you are in the same chat, replace this with: the research brief you just wrote in your previous message]
</brief>
