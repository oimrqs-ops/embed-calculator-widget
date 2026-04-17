# Embed Calculator Widget

Vanilla JavaScript calculator widget that can be embedded into a landing page,
WordPress custom HTML block, static site, or client preview without a build
step.

This project demonstrates a practical front-end delivery slice: clear inputs,
stable formatting, accessible markup, browser-safe JavaScript, and tests for
the pricing logic.

## Use Case

- quote simple service/project ranges
- show estimated monthly or one-time totals
- embed a calculator in a sales page without adding a framework
- hand off a single HTML/JS pair that a client can review quickly

## Files

- `index.html` - demo page
- `calculator.js` - embeddable widget and pure calculation helpers
- `calculator.test.mjs` - Node test coverage for the calculation logic

## Run Tests

```bash
npm test
```

## Embed

```html
<div data-ops-calculator></div>
<script type="module" src="./calculator.js"></script>
```

## Customize

Edit the `OPS_CALCULATOR_DEFAULTS` values in `calculator.js` to adjust base
price, urgency multiplier, and included hours.
