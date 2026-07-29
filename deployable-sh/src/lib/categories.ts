/** URL slug for a category name: "Caches & Key-Value" -> "caches-key-value" */
export function categorySlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/&/g, ' ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}
