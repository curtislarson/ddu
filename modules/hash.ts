import { createHash } from "https://deno.land/std@0.112.0/hash/mod.ts";

export const sha256 = (input: string) =>
  createHash("sha256").update(input).toString();

export const sha1 = (input: string) =>
  createHash("sha1").update(input).toString();
