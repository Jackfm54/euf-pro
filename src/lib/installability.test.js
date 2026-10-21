import { expect, test } from "bun:test";
import { readFileSync } from "node:fs";

test("mobile home-screen installation opens the same application in standalone mode", () => {
  const manifest = JSON.parse(readFileSync(new URL("../../public/manifest.webmanifest", import.meta.url), "utf8"));
  expect(manifest.display).toBe("standalone");
  expect(manifest.start_url).toBe("/");
  expect(manifest.scope).toBe("/");
  expect(manifest.icons.map((icon) => icon.sizes)).toContain("192x192");
  expect(manifest.icons.map((icon) => icon.sizes)).toContain("512x512");
});