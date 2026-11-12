import { describe, expect, test } from "bun:test";
import { isDeleteConfirmed, DEFAULT_LANGUAGE } from "./legal";
describe("règles légales", () => {
  test("la suppression exige le mot SUPPRIMER", () => {
    expect(isDeleteConfirmed("supprimer")).toBe(true);
    expect(isDeleteConfirmed("oui")).toBe(false);
  });
  test("le français est la langue par défaut", () => { expect(DEFAULT_LANGUAGE).toBe("fr"); });
});
