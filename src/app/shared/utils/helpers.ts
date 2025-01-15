export const toBearer = (token: string) => `Bearer ${token}`;

export function removeNullAndUndefined<T extends object>(obj: T): T {
  return Object.keys(obj).reduce((acc, key) => {
    const value = (obj as any)[key]; // Cast to any to access property dynamically
    if (value !== null && value !== undefined) {
      (acc as any)[key] = value; // Only add non-null and non-undefined fields
    }
    return acc;
  }, {} as T);
}
