import { defineConfig } from "astro/config";
import icon from "astro-icon";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: "http://astro-blog-cip.netlify.app",
  integrations: [icon(), sitemap(), react(), tailwind()]
});