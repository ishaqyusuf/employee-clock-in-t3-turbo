export function firstOrThrow<T>(data: T[], error = "Not found") {
  const [f] = data;
  if (!f) throw new Error(error);
  return f;
}
