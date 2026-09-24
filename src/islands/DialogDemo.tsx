import { useState } from "react";
import {
  Button,
  Dialog,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Flex,
  Input,
  Stack,
  Text,
} from "@vikalpshakya/ui";

// Dialog is controlled (open/onOpenChange), so it needs React state:
// the whole composition is one island.
export default function DialogDemo() {
  const [open, setOpen] = useState<"confirm" | "form" | "details" | null>(null);
  const [saved, setSaved] = useState("");
  const close = (next: boolean) => !next && setOpen(null);

  return (
    <Stack gap={3}>
      <Flex wrap gap={2}>
        <Button variant="destructive" onClick={() => setOpen("confirm")}>Delete test run (sm)</Button>
        <Button onClick={() => setOpen("form")}>Rename cell (md)</Button>
        <Button variant="outline" onClick={() => setOpen("details")}>View details (lg)</Button>
      </Flex>
      <Text size="sm" tone="muted" role="status">
        {saved ? `Saved name: ${saved}` : "Nothing saved yet."}
      </Text>

      <Dialog open={open === "confirm"} onOpenChange={close} size="sm">
        <DialogHeader>
          <DialogTitle>Delete test run?</DialogTitle>
          <DialogDescription>Run #4812 and its logs will be removed. This can’t be undone.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>Cancel</DialogClose>
          <Button variant="destructive" onClick={() => setOpen(null)}>Delete</Button>
        </DialogFooter>
      </Dialog>

      <Dialog open={open === "form"} onOpenChange={close}>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            setSaved(String(new FormData(event.currentTarget).get("cell")));
            setOpen(null);
          }}
        >
          <DialogHeader>
            <DialogTitle>Rename cell</DialogTitle>
            <DialogDescription>Shown in reports and the live dashboard.</DialogDescription>
          </DialogHeader>
          <label className="demo-field">
            Cell name
            <Input name="cell" defaultValue="gNB-DU 01" required />
          </label>
          <DialogFooter>
            {/* type="button" by default, so Cancel never submits the form */}
            <DialogClose>Cancel</DialogClose>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </Dialog>

      <Dialog open={open === "details"} onOpenChange={close} size="lg">
        <DialogHeader>
          <DialogTitle>Run details</DialogTitle>
          <DialogDescription>Escape, the × button or a backdrop click close it.</DialogDescription>
        </DialogHeader>
        <Text>
          The dialog uses the native &lt;dialog&gt; element: the browser provides the backdrop,
          the focus trap and focus return to the button that opened it.
        </Text>
        <DialogFooter>
          <DialogClose variant="primary">Done</DialogClose>
        </DialogFooter>
      </Dialog>
    </Stack>
  );
}
