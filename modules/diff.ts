import { JSONSchema7 } from "https://esm.sh/json-schema";
import { FromSchema } from "https://deno.land/x/json_schema_to_ts@v1.6.5-beta.1/index.d.ts";
import JsonPatch from "https://esm.sh/fast-json-patch";
import changesets from "https://esm.sh/json-diff-ts";

export const diff = (
  first: Record<string, unknown>,
  second: Record<string, unknown>,
  embedKeys?: string | Record<string, unknown>,
) => changesets.diff(first, second, embedKeys);

export const flattenChangeset = (
  diffs: changesets.IChange | changesets.Changeset,
) => changesets.flattenChangeset(diffs);

export const patches = (
  first: Record<string, unknown>,
  second: Record<string, unknown>,
) => JsonPatch.compare(first, second);

export const schemaDiff = <F extends JSONSchema7, S extends JSONSchema7>(
  firstSchema: F,
  firstObj: FromSchema<F>,
  secondSchema: S,
  secondObj: FromSchema<S>,
) => {
  const objDiff = changesets.diff(firstObj, secondObj);
  const schemaDiff = changesets.diff(firstSchema, secondSchema);
  return {
    objDiff,
    schemaDiff,
  };
};
