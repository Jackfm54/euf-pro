import { describe, expect, test } from "bun:test";
import { isLanguage, LANGUAGES, translate } from "./translations";

describe("requested language choices", () => {
  test("offers French", () => {
    expect(LANGUAGES.find((item) => item.value === "fr")?.label).toBe("Français");
    expect(isLanguage("fr")).toBe(true);
  });
  test("offers Spanish", () => {
    expect(LANGUAGES.find((item) => item.value === "es")?.label).toBe("Español");
    expect(isLanguage("es")).toBe(true);
  });
  test("offers Arabic", () => {
    expect(LANGUAGES.find((item) => item.value === "ar")?.label).toBe("العربية");
    expect(isLanguage("ar")).toBe(true);
  });
  test("rejects unsupported stored preferences", () => {
    expect(isLanguage("en")).toBe(false);
    expect(isLanguage(null)).toBe(false);
  });
  test("preserves uncatalogued French source material", () => {
    const source = "Extrait littéraire officiel non traduit.";
    expect(translate("ar", source)).toBe(source);
  });
});