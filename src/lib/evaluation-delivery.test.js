import { expect, test } from "bun:test";
import { deliverEvaluation } from "./evaluation-delivery";

test("a missing locally saved result never consumes an evaluation", async () => {
  let charges = 0;
  await expect(deliverEvaluation(() => { throw new Error("storage full"); }, async () => { charges++; })).rejects.toThrow("storage full");
  expect(charges).toBe(0);
});

test("delivery saves the result before consuming one evaluation", async () => {
  const events = [];
  await deliverEvaluation(() => events.push("saved"), async () => { events.push("charged"); });
  expect(events).toEqual(["saved", "charged"]);
});

test("a failed database save does not consume an evaluation", async () => {
  let charges = 0;
  await expect(deliverEvaluation(async () => { throw new Error("database unavailable"); }, async () => { charges++; })).rejects.toThrow("database unavailable");
  expect(charges).toBe(0);
});

test("the database save finishes before acknowledgement", async () => {
  let saved = false;
  await deliverEvaluation(async () => { await Promise.resolve(); saved = true; }, async () => { expect(saved).toBe(true); });
});