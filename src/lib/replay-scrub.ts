/**
 * Session replay snapshot scrubbing.
 *
 * The recorder masks every text node and input and blocks media, but it keeps
 * element attributes as they are: `aria-label`, `title`, `alt`, `data-*` and
 * link targets can hold names, email addresses or link tokens. Recording runs
 * with `compress_events: false`, so `$snapshot_data` reaches before_send as
 * plain rrweb events, and this keeps only attributes that describe layout and
 * styling, blanks every other value, and passes link targets and the page
 * address through the caller's URL redaction.
 */

/** Attributes kept as they are: layout, styling, state and SVG geometry, never content. */
const KEPT_ATTRIBUTES = new Set([
  "class",
  "id",
  "style",
  "type",
  "role",
  "rel",
  "media",
  "width",
  "height",
  "dir",
  "lang",
  "tabindex",
  "colspan",
  "rowspan",
  "disabled",
  "checked",
  "selected",
  "hidden",
  "open",
  "charset",
  "crossorigin",
  "xmlns",
  "viewBox",
  "viewbox",
  "d",
  "fill",
  "stroke",
  "stroke-width",
  "stroke-linecap",
  "stroke-linejoin",
  "points",
  "cx",
  "cy",
  "r",
  "rx",
  "ry",
  "x",
  "y",
  "x1",
  "x2",
  "y1",
  "y2",
  "transform",
  "_cssText",
]);

const CONTACT_LINK = /^\s*(?:mailto|tel|sms):/i;

/** Attributes holding an address, kept only after URL redaction. */
const URL_ATTRIBUTES = new Set(["href", "src", "action", "xlink:href", "poster"]);

function scrubAttributes(
  attributes: Record<string, unknown>,
  redactUrl: (value: string) => string,
): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [name, value] of Object.entries(attributes)) {
    // Non-strings are rrweb's own markers (null for a removed attribute, true for a boolean one).
    if (typeof value !== "string" || KEPT_ATTRIBUTES.has(name) || name.startsWith("rr_")) {
      out[name] = value;
    } else if (URL_ATTRIBUTES.has(name.toLowerCase())) {
      out[name] = redactUrl(value);
    } else {
      out[name] = "";
    }
  }
  return out;
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

/**
 * Scrubs replay snapshot data: element attributes (in full snapshots, added
 * nodes and attribute changes) and every `href` (the page address in meta and
 * URL-change events). Text was masked by the recorder before it got here.
 */
export function scrubSnapshotData(data: unknown, redactUrl: (value: string) => string): unknown {
  // A contact link's address is the personal part, whatever the caller's redaction does.
  const redact = (value: string) =>
    CONTACT_LINK.test(value) ? value.replace(/:[\s\S]*$/, ":") : redactUrl(value);
  return walk(data, redact);
}

function walk(data: unknown, redactUrl: (value: string) => string): unknown {
  if (Array.isArray(data)) return data.map((item) => walk(item, redactUrl));
  if (!isPlainObject(data)) return data;
  const out: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(data)) {
    if (key === "attributes" && isPlainObject(value)) out[key] = scrubAttributes(value, redactUrl);
    else if (key === "href" && typeof value === "string") out[key] = redactUrl(value);
    else out[key] = walk(value, redactUrl);
  }
  return out;
}
