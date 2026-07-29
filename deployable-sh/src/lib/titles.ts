import type { AppData } from '../data/types';

/**
 * Title tag for a stack page, with the stack name first.
 *
 * The authored seoTitle leads with "Self-host <Name>", which buries the bare
 * stack name - and the bare name is the highest-volume query for most of these
 * projects. This strips the lead-in and keeps the descriptor, so the name comes
 * first while phrases like "the Google Photos alternative" still earn their
 * queries.
 */
export function stackTitle(app: AppData): string {
  const name = app.name;
  let t = app.seoTitle.trim();

  // "Self-host <Name>: <descriptor>" -> "<descriptor>"
  const withName = new RegExp(`^self-host(ed)?\\s+${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*[:,-]\\s*`, 'i');
  // "Self-host <anything else>" -> "<anything else>"
  const bare = /^self-host(ed)?\s+/i;

  if (withName.test(t)) t = t.replace(withName, '');
  else if (bare.test(t)) t = t.replace(bare, '');

  // Already leads with the stack name, or with its first word ("Twenty" for
  // "Twenty CRM", "Kong" for "Kong Gateway")? Prefixing would just repeat it.
  const firstWord = name.split(/\s+/)[0]!.toLowerCase();
  const lower = t.toLowerCase();
  if (lower.startsWith(name.toLowerCase()) || lower.startsWith(firstWord)) return t;
  return `${name}: ${t}`;
}
