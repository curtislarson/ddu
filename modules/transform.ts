import { JSONSchema7, JSONSchema7TypeName } from "https://esm.sh/json-schema";
import traverse from "https://esm.sh/json-schema-traverse";

type RootSchema = JSONSchema7 & {
  $id: string;
  type: "object";
};

type SchemObj = Omit<JSONSchema7, "type"> & {
  type?: JSONSchema7TypeName;
};

type TransformCallback = (
  schema: SchemObj,
  jsonPointer: string,
  root: JSONSchema7,
  parentPointer: string | undefined,
  parentKeyword: string | undefined,
  parentSchema: JSONSchema7 | undefined,
  indexProperty: string | number | undefined
) => void;

export type TransformFunc<T> = (
  val: { type: T } & Record<string, unknown>
) => string;

export type TransformMap<T extends JSONSchema7TypeName = JSONSchema7TypeName> =
  Record<T, TransformFunc<T>>;

export const transform = (
  schema: RootSchema,
  preTransform: TransformMap,
  postTransform: TransformMap
) => {
  const output: string[] = [];

  const pre: TransformCallback = (schema) => {
    const { type } = schema;
    if (type !== undefined) {
      const fn = preTransform[type];
      const newSchema = {
        ...schema,
        type,
      };
      output.push(fn(newSchema));
    }
  };

  const post: TransformCallback = (schema) => {
    const { type } = schema;
    if (type !== undefined) {
      const fn = postTransform[type];
      const newSchema = {
        ...schema,
        type,
      };
      output.push(fn(newSchema));
    }
  };

  traverse(schema, { allKeys: true, cb: { pre, post } });

  return output;
};
