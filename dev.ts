#!/usr/bin/env -S deno run -A --watch=routes/

import dev from "$fresh/dev.ts";
import { config } from "dotenv";

config({ export: true, safe: true });

await dev(import.meta.url, "./main.ts");
