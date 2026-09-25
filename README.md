# astro-showcase

A reference Astro app for `@vikalpshakya/ui`. It installs the library as a
normal package dependency and shows every exported component, the design
tokens, and how interactive components become Astro islands.

```bash
npm install          # install (library comes from npm)
npm run dev          # dev server, http://localhost:4321
npm run build        # astro check + static build into dist/
npm run preview      # serve dist/
npm run ui:update    # rebuild ../../vikalp-ui, repack it, reinstall it here
```

## How the library is consumed

`package.json` depends on the library from npm:

```json
"@vikalpshakya/ui": "^0.2.0"
```

The library is installed as a real copy, not a symlink. This ensures the demo exercises the package boundary and gets a single React copy without any Vite `dedupe` config.

After changing the library, run `npm run ui:update`.

## Static vs interactive

| Where | Components | How |
|---|---|---|
| `src/pages/*.astro` | Alert, Avatar, Badge, Button, Card, Checkbox, Container, Divider, EmptyState, Flex, Grid, Heading, Input, Link, List, Progress, Radio, Select, Skeleton, Spinner, Stack, Switch, Table, Text, Textarea | Used directly, no `client:*`. Rendered to HTML at build time and ship no JS. Native form controls still work. |
| `src/islands/*.tsx` | Dialog, Dropdown, Tabs, Tooltip, Toast, Checkbox `indeterminate`, Avatar image fallback | One small component per demo, hydrated with a `client:*` directive |

Why interactive demos need a `.tsx` wrapper:

- Each `client:*` component is its own React root, and compound parts
  (`DialogTitle`, `TabsTrigger`, `DropdownItem`) read their parent's context.
  So they have to be composed together in one React file.
- Dialog is controlled (`open` / `onOpenChange`), so it needs React state.
- `useToast()` must run under `ToastProvider` in the same island.
- Tooltip clones its child to add `aria-describedby`; an Astro slot can't
  provide a React element.

Hydration directives:

| Directive | Used for | Why |
|---|---|---|
| `client:idle` | Dialog, Dropdown | Near the top of the page: ready soon after load without competing with it |
| `client:visible` | Tabs, Tooltip, Toast, Checkbox indeterminate, Tabs on the home page | Lower on the page: JS loads only when scrolled into view. Server HTML already shows the default tab |
| `client:only="react"` | Avatar fallback | See the limitation below |

## Patterns for Astro consumers

- **Markup into a `ReactNode` prop** (e.g. EmptyState `icon` / `action`):
  use a named slot, `<svg slot="icon">…</svg>`. Astro can't compile
  JSX inside an attribute expression.
- **`className`, not `class`,** on library components.
- **Fonts:** the library references Fira Sans and Ubuntu Mono but never loads
  them. This app loads them with Astro's font API (as the website does) and
  points `--ui-font-family-sans` / `--ui-font-family-mono` at them.
- **Dark mode:** a static library `Button` plus a few lines of vanilla JS
  toggle `.dark` on `<html>`. No React is needed for that.

## Known issues found

- **Avatar fallback under SSR:** a server-rendered `<img>` starts loading
  before React hydrates. A fast 404 fires `error` before Avatar's `onError`
  exists, so the broken image stays. The demo uses `client:only`. A library
  fix would check `img.complete && !img.naturalWidth` on mount.
- **Contrast:** axe reports some library token pairs below 4.5:1:
  - Badge success (3.13), Badge info (4.09) and Badge primary (≈2.6)
  - the destructive Button (3.9 light / 3.1 dark)
  - `Text tone="error"` on a dark card (3.57)

  These are documented in the library README as needing a design decision.
  The demo's own chrome only uses passing variants.
- **Bundle:** every island imports the same ~18 KB (6 KB gzip) library chunk,
  because the library bundle isn't tree-shakeable yet (known, deferred).
- **Version pairing:** Astro 5 needs `@astrojs/react` 4.x. The 6.x line pulls
  in Vite 8 and breaks the dev server ("Missing field `moduleType`") unless
  npm happens to hoist Vite 6, which is the case in the website today.
