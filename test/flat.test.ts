import { flat } from "../modules/mod.ts";
import { assertEquals } from "https://deno.land/std@0.112.0/testing/asserts.ts";

Deno.test("flat", () => {
  const layered = { a: { b: { c: ["d"] } } };

  const flattened = flat(layered);

  assertEquals(flattened, { "a.b.c.0": "d" });
});
