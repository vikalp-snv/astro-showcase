import { defineConfig } from "astro/config";
import react from "@astrojs/react";

// Same integration and fonts as the Simnovus website, so the demo is a
// faithful consumer. The library references Fira Sans / Ubuntu Mono but
// never loads them; the app does.
export default defineConfig({
  devToolbar: { enabled: false },
  integrations: [react()],
});