export function isValidHex(hex: string): boolean {
  if (typeof hex !== "string") return false;
  const h = hex.trim();
  return /^#(?:[A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})$/.test(h);
}

export function sanitizeHex(hex: string): string | null {
  if (typeof hex !== "string") return null;
  let h = hex.trim();
  // Allow raw hex without '#'
  if (h[0] !== "#") {
    if (/^[A-Fa-f0-9]{3}$/.test(h) || /^[A-Fa-f0-9]{6}$/.test(h)) {
      h = "#" + h;
    } else {
      return null;
    }
  }
  if (!isValidHex(h)) return null;
  if (h.length === 4) {
    // Expand shorthand #abc -> #aabbcc
    h = "#" + h.slice(1).split("").map((c) => c + c).join("");
  }
  return h.toUpperCase();
}
