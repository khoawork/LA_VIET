function emptyShape(value: unknown): unknown {
  if (Array.isArray(value)) return [];
  if (value !== null && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, child]) => [key, emptyShape(child)]),
    );
  }
  if (typeof value === "string") return "";
  if (typeof value === "number") return 0;
  if (typeof value === "boolean") return false;
  return value;
}

/** Keep the schema's shape without publishing values it supplied for absent fields. */
export function withoutMissingDefaults<T>(stored: unknown, parsed: T): T {
  if (stored === undefined) return emptyShape(parsed) as T;

  if (Array.isArray(parsed) && Array.isArray(stored)) {
    return parsed.map((item, index) => withoutMissingDefaults(stored[index], item)) as T;
  }

  if (parsed !== null && typeof parsed === "object") {
    // A primitive source may be intentionally transformed into an object by the schema.
    if (stored === null || typeof stored !== "object" || Array.isArray(stored)) {
      return parsed;
    }
    const source = stored as Record<string, unknown>;
    return Object.fromEntries(
      Object.entries(parsed).map(([key, value]) => [
        key,
        withoutMissingDefaults(source[key], value),
      ]),
    ) as T;
  }

  return parsed;
}
