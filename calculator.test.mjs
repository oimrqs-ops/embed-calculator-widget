import test from "node:test";
import assert from "node:assert/strict";
import { calculateEstimate, roundCurrency } from "./calculator.js";

test("uses the base price for included hours", () => {
  assert.deepEqual(calculateEstimate({ hours: 3, urgent: false }), {
    hours: 3,
    urgent: false,
    subtotal: 120,
    total: 120,
  });
});

test("adds extra-hour pricing above the included amount", () => {
  assert.equal(calculateEstimate({ hours: 5, urgent: false }).total, 210);
});

test("applies urgency multiplier for 24h turnaround", () => {
  assert.equal(calculateEstimate({ hours: 3, urgent: true }).total, 150);
});

test("rounds currency values to two decimals", () => {
  assert.equal(roundCurrency(10.235), 10.24);
});
