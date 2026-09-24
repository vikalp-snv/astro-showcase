import { Button, ToastProvider, useToast, type ToastVariant } from "@vikalpshakya/ui";

// useToast() only works under ToastProvider in the same React tree, so the
// provider and every button that raises a toast share this one island.
function Buttons() {
  const { toast } = useToast();
  const variants: ToastVariant[] = ["info", "success", "warning", "error"];
  return (
    <>
      {variants.map((variant) => (
        <Button
          key={variant}
          variant="outline"
          onClick={() =>
            toast({ variant, title: `${variant[0].toUpperCase()}${variant.slice(1)}`, description: `variant: "${variant}"` })
          }
        >
          {variant}
        </Button>
      ))}
      <Button
        variant="secondary"
        onClick={() =>
          toast({ title: "Stays until closed", description: "duration: Infinity", duration: Infinity })
        }
      >
        Persistent
      </Button>
      <Button
        variant="ghost"
        onClick={() =>
          toast({
            variant: "warning",
            title: "Long content wraps",
            description:
              "https://reports.example.com/runs/4812/artifacts/pcap/ue-17-rrc-setup-complete-with-a-very-long-unbroken-identifier",
          })
        }
      >
        Long URL
      </Button>
    </>
  );
}

export default function ToastDemo() {
  return (
    <ToastProvider>
      <Buttons />
    </ToastProvider>
  );
}
