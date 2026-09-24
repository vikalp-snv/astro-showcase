import { readFileSync } from "node:fs";
import { join } from "node:path";

// Build-time only. Read from the *installed* package, so the demo shows what
// consumers actually get. package.json isn't in the package's `exports`, so
// it can't be imported by specifier; read it from node_modules instead.
const root = join(process.cwd(), "node_modules/@vikalpshakya/ui");

export const pkg: { name: string; version: string; description: string } = JSON.parse(
  readFileSync(join(root, "package.json"), "utf8"),
);

const css = readFileSync(join(root, "dist/styles.css"), "utf8");

/**
 * `--ui-*` declarations of every rule whose selector list includes `selector`.
 * First declaration wins, so the base value beats a later @media override.
 */
function tokensOf(selector: string) {
  const tokens = new Map<string, string>();
  for (const [, sel, body] of css.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    if (!sel.split(",").some((s: string) => s.trim() === selector)) continue;
    for (const [, name, value] of body.matchAll(/--ui-([\w-]+)\s*:\s*([^;]+)/g)) {
      if (!tokens.has(name)) tokens.set(name, value.trim());
    }
  }
  return tokens;
}

/** Light values come from :root, dark from .dark (same file the components use). */
export const lightTokens = tokensOf(":root");
export const darkTokens = tokensOf(".dark");
