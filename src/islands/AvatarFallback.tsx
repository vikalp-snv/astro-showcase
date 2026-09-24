import { Avatar } from "@vikalpshakya/ui";

// Avatar switches to initials in an <img> onError handler. Used with
// client:only: with SSR + hydration the error can fire before the handler exists.
export default function AvatarFallback() {
  return (
    <>
      <Avatar src="/missing-photo.png" alt="Ada Lovelace" />
      <Avatar size="lg" src="/missing-photo.png" alt="Alan Turing" />
    </>
  );
}
