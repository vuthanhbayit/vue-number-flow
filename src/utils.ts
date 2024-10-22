/**
 * Omit specified keys from an object or an array of objects.
 *
 * @template T - The type of the input object or objects.
 * @template K - The keys to omit from the object or objects.
 * @param {T[] | Record<any, any>} obj - The input object or an array of objects.
 * @param {...K} keys - The keys to omit from the object or objects.
 * @returns {Omit<T, K>[] | Omit<T, K>} - The object with specified keys omitted or an array of objects with specified keys omitted.
 */
export function omit<T extends object, K extends Extract<keyof T, string>>(
  obj: T,
  ...keys: K[]
): Omit<T, K> {
  const _obj = { ...obj }
  for (const key of keys) {
    delete _obj[key]
  }
  return _obj
}
