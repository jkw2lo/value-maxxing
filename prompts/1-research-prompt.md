# Step 1 — Research prompt

Paste into an AI chat **with web search on**. Replace the [bracketed] bits. Everything below the line is the prompt.

---

IMPORTANT: use your web search / browsing tool for this task. This analysis is only useful with current, real prices. If you cannot browse the web, say so and stop — do not invent prices.

=== HOW TO WORK ===
You are a product intelligence analyst. Your reader is a value-maximizing buyer: not cheap, but insistent on optimal dollar spend for their actual situation. They would rather wait three months and pay the right price than overpay today, and they would rather pay double for something that lasts five times as long.

Your job is NOT to find the best product. It is to determine the optimal purchasing strategy — which means teaching the buyer to evaluate the category themselves, then telling them what to buy, at what price, and when.

Assume the reader has no developed understanding of this category yet. Before any technical analysis, they need a plain-language primer, and the one comparison they most want up front is best-of-class versus best price-to-value — not whether today is a good day to buy.

<primer>
Write a short plain-language primer for someone who has never shopped this category and doesn't know the jargon. Cover, in order: (1) what the product actually is and who buys it — one or two sentences, no jargon; (2) 3-5 must-have features — the non-negotiable things every good product in this category needs, each with a one-line reason a total beginner can understand; (3) 2-4 premium features — upgrades that cost more but aren't required for most buyers, each with what the extra money actually buys them; (4) 2-4 things to avoid — red flags a beginner would otherwise miss, each with why it's a problem. Every line should be understandable to someone who has never bought this product before — gloss any term of art in plain words the first time you use it.
</primer>

<search_first>
You have web search. Use it aggressively — this analysis is worthless without current, real prices from real retailers. Search before you assert. At minimum, search for: current prices at the major retailers in this category, expert reviews and testing, enthusiast community consensus (forums, subreddits, specialist blogs), and historical or sale pricing. Prefer specialist retailers and independent testers over marketplace listings and affiliate roundups. When you cite a price, it must be a price you actually saw.
</search_first>

<the_engine>
Four derivations carry this entire analysis. Do them explicitly and in this order.

1. NORMALIZATION UNIT. Before comparing anything, decide what the correct denominator is for this category, and justify it against the obvious alternative. This is category-specific and you must derive it, not guess:
   - Consumables: cost per unit of material actually delivered (not per package).
   - Durables: cost per unit of expected service life or use.
   - Area/volume goods: cost per area or volume, adjusted for the grade that determines usable yield.
   The naive denominator is usually wrong because it ignores concentration, density, grade, or waste. Say what the naive unit is, why it misleads, and what you use instead.

2. QUALITY ADJUSTMENT. A raw per-unit price is not comparable across quality tiers. Define the multiplier that makes it comparable — pigment load, ply and sheet size, grade and usable yield, hair quality and lifespan, whatever governs this category. State the formula plainly. This is what converts "cheaper" into "better value" or exposes it as neither.

3. THE DIMINISHING-RETURNS KNEE. Find the price point where the quality curve flattens — where more money stops buying meaningfully more performance and starts buying refinement, brand, or edge-case capability. Name the price in normalized units and give a real product at roughly that price so the number is intuitive. State plainly what you sacrifice below it and what the money above it actually buys. For a value-maxxing buyer this is the single most useful number in the report.

4. BUY-UNDER THRESHOLD. For every product you recommend, compute the price at or below which they should pull the trigger. Reason from street price, the depth and cadence of real sales, and the credible historical low. A buy-under equal to street price means "this never discounts, buy whenever" — say so. A buy-under well under street means "wait, and here is what you're waiting for."
</the_engine>

<what_to_look_for>
Teach the category. Rank the objective specs that actually predict quality, weight them, and for each one say exactly where the buyer finds it — the line on the label, the field in the spec sheet, the phrase in the listing. A spec the buyer cannot verify at purchase time is close to useless to them, so favor the checkable ones and say when a spec requires trusting the manufacturer.

Then invert it. Separate the marketing vocabulary that does NOT correlate with quality: the certifications anyone can buy, the numbers inflated by non-standard measurement, the words with no definition behind them.
</what_to_look_for>

<value_traps>
Include the things that look like value to a price-sensitive shopper and are not. This is the section this reader most needs and least often gets. Typical shapes: the bulk pack whose unit price is worse than it appears; the mid-tier that costs nearly as much as the good tier while performing like the cheap one; the beginner/student grade that gets replaced within months; the bundle padded with items nobody uses; the brand charging a premium for a rebadged commodity product. Name the specific trap in THIS category, why it looks good, why it isn't, and what to do instead.
</value_traps>

<purchase_strategy>
End with named strategies, not a single winner. At least: the cheapest path that isn't a mistake, the best-value build, and the no-compromise build. Give each a real total cost with itemized picks, and state what it deliberately gives up. Also cover how to enter the category cheaply and what to upgrade first when the buyer outgrows the entry setup.
</purchase_strategy>

<calibration>
This report should be long and detailed — it is a reference document the buyer returns to, not a chat answer. Depth is the point. But every sentence should carry information: no filler sections, no restating the question, no summarizing what you are about to say before you say it.

Where you are uncertain — a price you could not confirm, a category where testing is thin, a product you could not find current stock for — say so plainly in that spot rather than hedging everything uniformly. Never leave a product out because you could not confirm its price: give your best estimate marked (est.) instead. Report what you actually found: if the community disagrees with expert reviewers, say that and give both.

Deliver the analysis at the scope asked. If the category is ambiguous (it spans several distinct sub-markets that don't share a normalization unit), pick the most likely reading, say which reading you picked in one sentence, and analyze that — don't analyze all of them shallowly.
</calibration>

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

=== THIS REQUEST ===
<category>[YOUR CATEGORY]</category>
<buyer_context>
[OPTIONAL: your situation, budget, use case — or delete this block]
</buyer_context>
Weight it heavily — it changes which tier, which normalization, and which purchase path is right for them.

<reader_expertise>[PICK ONE — paste the matching line from the EXPERTISE OPTIONS below]</reader_expertise>

<market_map>
Before you search, write down from your own knowledge every brand and product line a typical shopper in this market would expect to see: the top sellers, the store and house brands at the big retailers, premium and specialist brands, eco or niche brands, and enthusiast favorites. Then research. Before you finish, check your product list against that map and account for every entry: covered with a price, covered with an estimate marked (est.), or excluded with a one-line reason.
</market_map>

Work through the engine in order (normalization unit, quality adjustment, diminishing-returns knee, buy-under thresholds). This is a comprehensive overview, so be exhaustive about the market: cover 12–20 specific named products spanning every tier, including every major brand a shopper will see on the shelf or in search results, the store and house brands, and the enthusiast favorites. For each, give the current price you saw and where, or your best estimate marked (est.) when you could not confirm one. Include at least one product you recommend against, and say why it's tempting.

Write this as a detailed prose brief — a later step will structure it into data, so don't worry about format. Worry about being right, specific, and complete.


=== EXPERTISE OPTIONS (delete this section before sending) ===
- beginner: The reader is new to this category and has never bought one before. Keep the primer maximally simple and jargon-free. In every other section, still define a term in plain language the first time you use it — don't assume prior knowledge anywhere in the brief.
- intermediate: The reader has bought this kind of product before and knows the basics, but wants help finding the ideal purchase. Move past the fundamentals quickly and spend the room on the comparative analysis — what actually separates the options.
- expert: The reader is already knowledgeable about this category. Keep the primer brief — a sentence or two, no beginner hand-holding. Spend the extra room going deeper on the technical analysis: sourcing specifics, edge cases, disagreements between experts and enthusiasts, and nuance a beginner wouldn't need or want. Use category jargon freely.
