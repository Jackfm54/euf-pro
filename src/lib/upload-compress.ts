// Prepara fotos y PDF para enviarlos al servidor sin superar el límite de
// 4,5 MB por solicitud de Vercel: las fotos se reducen en el navegador.
export const MAX_PDF_BYTES = 3 * 1024 * 1024;
export const MAX_TOTAL_CHARS = 4_000_000;
const MAX_SIDE = 1600;

export class UploadError extends Error {
  constructor(public code: "pdf_grande" | "imagen" | "total") { super(code); }
}

function readAsDataURL(file: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => (typeof reader.result === "string" ? resolve(reader.result) : reject(new UploadError("imagen")));
    reader.onerror = () => reject(new UploadError("imagen"));
    reader.readAsDataURL(file);
  });
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new UploadError("imagen"));
    img.src = src;
  });
}

export async function prepareUpload(file: File): Promise<string> {
  if (file.type === "application/pdf") {
    if (file.size > MAX_PDF_BYTES) throw new UploadError("pdf_grande");
    return readAsDataURL(file);
  }
  if (!file.type.startsWith("image/")) throw new UploadError("imagen");
  const original = await readAsDataURL(file);
  const img = await loadImage(original);
  const scale = Math.min(1, MAX_SIDE / Math.max(img.naturalWidth, img.naturalHeight));
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(img.naturalWidth * scale));
  canvas.height = Math.max(1, Math.round(img.naturalHeight * scale));
  const ctx = canvas.getContext("2d");
  if (!ctx) return original;
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL("image/jpeg", 0.8);
}

export function totalChars(files: string[]): number {
  return files.reduce((sum, f) => sum + f.length, 0);
}

export function fitsRequest(files: string[]): boolean {
  return totalChars(files) <= MAX_TOTAL_CHARS;
}
