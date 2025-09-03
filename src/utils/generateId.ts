export function generateUniqueId(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `id-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export function generateShortId(prefix: string = "item"): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substr(2, 5);
  return `${prefix}-${timestamp}-${random}`;
}

let counter = 0;
export function generateSequentialId(prefix: string = "item"): string {
  counter++;
  return `${prefix}-${counter}`;
}
