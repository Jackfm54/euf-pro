import { describe, expect, test } from "bun:test";
import { compterFautes, fautesPermises, contexteRegles, fusionnerListes } from "./correction-rules";

describe("règles de correction ÉUF", () => {
  test("900 mots = 30 fautes permises", () => expect(fautesPermises(900)).toBe(30));
  test("600 mots = 20 fautes permises", () => expect(fautesPermises(600)).toBe(20));
  test("les fautes sont recomptées depuis la liste d'erreurs", () => {
    expect(compterFautes([{ categorie: "syntaxe" }, { categorie: "syntaxe" }, { categorie: "orthographe" }]))
      .toEqual({ vocabulaire: 0, syntaxe: 2, orthographe: 1 });
  });
  test("moins de 600 mots signale l'échec", () => expect(contexteRegles(550)).toContain("moins de 600 mots"));
  test("900 mots ne signale pas d'échec", () => expect(contexteRegles(900)).not.toContain("échec"));
});

describe("fusion des trois listes d'erreurs", () => {
  const une = (x) => ({ extrait: x, type: "t", explication: "e" });
  test("chaque liste garde sa catégorie, orthographe en premier", () => {
    const r = fusionnerListes({
      erreursVocabulaire: [une("faire une chose")],
      erreursSyntaxe: [une("il dit que")],
      erreursOrthographe: [une("école")],
    });
    expect(r.erreurs.map((e) => e.categorie)).toEqual(["orthographe", "syntaxe", "vocabulaire"]);
    expect(r.fautes).toEqual({ vocabulaire: 1, syntaxe: 1, orthographe: 1 });
  });
  test("une liste de vocabulaire vide donne zéro faute de vocabulaire", () => {
    const r = fusionnerListes({
      erreursVocabulaire: [],
      erreursSyntaxe: [],
      erreursOrthographe: [une("école")],
    });
    expect(r.erreurs.length).toBe(1);
    expect(r.fautes).toEqual({ vocabulaire: 0, syntaxe: 0, orthographe: 1 });
  });
  test("les listes de la IA ne restent pas dans le résultat final", () => {
    const r = fusionnerListes({
      erreursVocabulaire: [],
      erreursSyntaxe: [],
      erreursOrthographe: [],
      recommandations: ["relire"],
    });
    expect(r.erreursVocabulaire).toBeUndefined();
    expect(r.recommandations).toEqual(["relire"]);
  });
});
