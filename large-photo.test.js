import { expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { fitsRequest, prepareUpload, UploadError } from "./upload-compress.ts";

test("a photo larger than 10 MB reaches browser compression in both upload views", async () => {
  for (const path of ["../routes/_authenticated/redaction.tsx", "../components/ProfessorReview.tsx"]) {
    const source = readFileSync(new URL(path, import.meta.url), "utf8");
    expect(source).not.toMatch(/file\.size\s*>\s*10\s*\*\s*1024\s*\*\s*1024/);
  }
  const originals = { FileReader: globalThis.FileReader, Image: globalThis.Image, document: globalThis.document };
  let compressed = false;
  globalThis.FileReader = class {
    readAsDataURL() { this.result = "data:image/jpeg;base64,original"; this.onload(); }
  };
  globalThis.Image = class {
    naturalWidth = 4000;
    naturalHeight = 3000;
    set src(value) { this.onload(); }
  };
  globalThis.document = { createElement: () => ({
    getContext: () => ({ fillRect() {}, drawImage() {} }),
    toDataURL: () => { compressed = true; return "data:image/jpeg;base64,reduced"; },
  }) };
  try {
    const photo = new File([new Uint8Array(11 * 1024 * 1024)], "large.jpg", { type: "image/jpeg" });
    expect(photo.size).toBeGreaterThan(10 * 1024 * 1024);
    const result = await prepareUpload(photo);
    expect(compressed).toBe(true);
    expect(result).toBe("data:image/jpeg;base64,reduced");
    expect(fitsRequest([result])).toBe(true);
  } finally { Object.assign(globalThis, originals); }
});

test("PDFs larger than 3 MB remain rejected", async () => {
  const pdf = new File([new Uint8Array(3 * 1024 * 1024 + 1)], "large.pdf", { type: "application/pdf" });
  try { await prepareUpload(pdf); throw new Error("PDF was accepted"); }
  catch (error) { expect(error).toBeInstanceOf(UploadError); expect(error.code).toBe("pdf_grande"); }
});