import dev from "$fresh/dev.ts";
import { config as dotenvConfig } from "dotenv";
import config from "./fresh.config.ts";

dotenvConfig({ export: true });

await dev(import.meta.url, "./main.ts", config);
