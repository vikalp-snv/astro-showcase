import { Button, Tooltip } from "@vikalpshakya/ui";

// Tooltip clones its child to add aria-describedby, so the child must be a
// React element: an Astro slot can't provide one, hence this island.
export default function TooltipDemo() {
  return (
    <>
      {(["top", "right", "bottom", "left"] as const).map((placement) => (
        <Tooltip key={placement} content={`Placement: ${placement}`} placement={placement}>
          <Button variant="outline">{placement}</Button>
        </Tooltip>
      ))}
      <Tooltip content="Refresh results">
        <Button size="icon" variant="ghost" aria-label="Refresh">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 12a9 9 0 1 1-3-6.7L21 8" />
            <path d="M21 3v5h-5" />
          </svg>
        </Button>
      </Tooltip>
      <Tooltip content="Never shown" disabled>
        <Button variant="secondary">Tooltip disabled</Button>
      </Tooltip>
    </>
  );
}
