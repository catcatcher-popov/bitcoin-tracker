export function formatDate(input: Date | string | number): string {
  const date = input instanceof Date ? input : new Date(input);

  return date.toLocaleDateString(undefined);
}
