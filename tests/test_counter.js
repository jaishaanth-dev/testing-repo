import assert from "node:assert/strict";
import { goalMessage, stepsRemaining } from "../counter.js";

assert.equal(stepsRemaining(3, 10), 7);
assert.equal(stepsRemaining(10, 10), 0);
assert.equal(stepsRemaining(12, 10), -2);
assert.equal(stepsRemaining(4, ""), null);

assert.equal(goalMessage(3, 10), "7 to go.");
assert.equal(goalMessage(10, 10), "Goal reached.");
assert.equal(goalMessage(12, 10), "Past the goal by 2.");
assert.equal(goalMessage(4, null), "No goal set.");

console.log("counter tests passed");
