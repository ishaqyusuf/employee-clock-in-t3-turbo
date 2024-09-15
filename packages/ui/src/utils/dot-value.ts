export function dotValue<T>(obj: T, path: string): any {
  return path.split(".").reduce((acc, part) => acc && acc[part], obj);
}
