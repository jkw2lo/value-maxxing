# The Value Maxxing framework

## The reader
A value-maximizer: not cheap, but insistent on the optimal spend for their situation. They would wait three months to pay the right price, and pay double for something that lasts five times as long.

## The goal
Not "the best product". The **optimal purchasing strategy**: teach the buyer to evaluate the category, then say what to buy, at what price, and when. Best of class and best price-to-value are reported side by side because they are usually different products.

## Four derivations (done per category, never hardcoded)
1. **Normalization unit.** The right denominator for the category (cost per unit of material delivered, per unit of service life, per usable area/volume). Name the naive unit, why it misleads, and what to use instead.
2. **Quality adjustment.** The multiplier that makes per-unit prices comparable across tiers (pigment load, ply and sheet size, grade and yield, lifespan…). State the formula.
3. **Diminishing-returns knee.** The normalized price where the quality curve flattens. Give a real product near it, what you give up below it, and what money above it actually buys.
4. **Buy-under threshold.** For each recommended product, the price at or below which to buy, reasoned from street price, sale depth/cadence and credible historical low.

## Three output layers
1. **Primer** — plain-language: what it is, must-have features, premium features, things to avoid. Assumes the reader knows nothing.
2. **Strategy** — best of class vs. best value, the price ladder ("what to expect to pay"), prices by segment (split on the attribute that drives price in this category, such as carat weight, ply or organic vs. conventional, else budget / mid-range / premium), awards (overall, value, budget, premium, beginners, longest-lasting, avoid).
3. **Evidence** — spec decoder (where to find each spec), marketing noise, value traps, tiers, expert vs. community consensus, brand profiles (positioning, pros and cons, verdict), product table with scores, deal intelligence, named purchase paths.

## Two passes
- **Research pass** (needs web search): long prose brief, with real prices and retailers.
- **Structuring pass** (no search): reformat the brief into JSON. Preserve numbers and judgments exactly; use null/empty/caveat rather than guessing.

## Expertise setting
Beginner: simple primer, define terms everywhere. Some experience: skip fundamentals, focus on what separates options. Very knowledgeable: brief primer, deeper technical analysis and expert-vs-community disagreements.

## Adapting it
- Change the reader by editing the first paragraph of the research prompt.
- Add sections by adding keys to the schema **and** a renderer in `viewer.html`.
- Everything category-specific (units, bands, curve, tiers, the segment dimension) lives in the JSON. The prompts contain no category knowledge.
