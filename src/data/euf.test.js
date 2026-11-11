import { describe, expect, test } from "bun:test";
import { SUJETS } from "./euf";

describe("complete subject collection", () => {
  test("retains exactly 15 distinct subjects", () => {
    expect(SUJETS).toHaveLength(15);
    expect(new Set(SUJETS.map((s) => s.id)).size).toBe(15);
  });
  test("no subject has missing reading material", () => {
    expect(SUJETS.filter((s) => s.extraits.length === 0)).toEqual([]);
    for (const s of SUJETS) {
      for (const e of s.extraits) {
        expect(e.paragraphes.join(" ").trim().length).toBeGreaterThan(100);
      }
    }
  });
  test("each comparison has Texte 1 and Texte 2", () => {
    for (const s of SUJETS.filter((s) => s.type === "Sujet de comparaison")) {
      expect(s.extraits.map((e) => e.etiquette)).toEqual(["Texte 1", "Texte 2"]);
    }
  });
  test("replacement prompts do not claim official exam provenance", () => {
    const practice = SUJETS.filter((s) => s.id.startsWith("pratique-"));
    expect(practice).toHaveLength(11);
    for (const s of practice) {
      expect(s.rang).toBe("Sujet de pratique");
      for (const e of s.extraits) {
        expect(e.source).toBe("Sujet de pratique");
        expect(e.sourceUrl.startsWith("https://fr.wikisource.org/wiki/")).toBe(true);
      }
    }
  });
  test("the four existing complete official subjects remain", () => {
    expect(SUJETS.filter((s) => s.extraits[0]?.source === "Épreuve officielle").map((s) => s.id)).toEqual([
      "entree-ecole", "juste-la-fin-du-monde", "relation-naissante", "rentree-scolaire",
    ]);
  });
});