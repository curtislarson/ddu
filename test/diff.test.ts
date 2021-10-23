import { diff, flattenChangeset, patches, schemaDiff } from "../modules/mod.ts";
import {
  assert,
  assertEquals,
} from "https://deno.land/std@0.112.0/testing/asserts.ts";

Deno.test("diff diffString", () => {
  const first = {
    username: "asd",
    password: 123,
  };
  const second = {
    headers: { username: "asd", password: 123 },
  };

  const diffs = diff(first, second);

  assertEquals(diffs.length, 3);

  const flat = flattenChangeset(diffs);

  assertEquals(flat.length, 3);

  const patchd = patches(first, second);

  assertEquals(patchd.length, 3);
});

const base = Deno.cwd() + "/test/fixtures/";
Deno.test("schemaDiff", async () => {
  const [schemaOne, d1, schemaTwo, d2] = await Promise.all([
    await Deno.readTextFile(base + "schema-one.json"),
    await Deno.readTextFile(base + "d1.json"),
    await Deno.readTextFile(base + "schema-two.json"),
    await Deno.readTextFile(base + "d2.json"),
  ]);

  const d1Parse = JSON.parse(d1);
  const d2Parse = JSON.parse(d2);
  const schOneParse = JSON.parse(schemaOne);
  const schTwoParse = JSON.parse(schemaTwo);

  const diffs = diff(d1Parse, d2Parse);

  const schemaDiffs = schemaDiff(schOneParse, d1Parse, schTwoParse, d2Parse);

  assert(diffs.length === schemaDiffs.objDiff.length);
});
