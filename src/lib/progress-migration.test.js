import { expect, test } from "bun:test";
import { ownedProfessorRecords } from "./progress-migration";

test("professor migration imports only records belonging to the signed-in account", () => {
  const keys = ["euf.professor.v1.account.alice.review.es", "euf.professor.v1.account.bob.review.es", "euf.professor.v1.review.es"];
  const storage = { length: keys.length, key: index => keys[index], getItem: () => JSON.stringify({ bilan: "Review", observations: [] }) };
  const records = ownedProfessorRecords(storage, "alice");
  expect(records.length).toBe(1);
  expect(records[0].id).toBe("review.es");
});