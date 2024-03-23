import { defineConfig } from "$fresh/server.ts";
import twindPlugin from "$fresh/plugins/twind.ts";
import twindConfig from "./twind.config.ts";

const port = parseInt(Deno.env.get("PORT") ?? "");
export default defineConfig({
  plugins: [twindPlugin(twindConfig)],
  port: Number.isNaN(port) ? undefined : port,
});
