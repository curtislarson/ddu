import { sha1, sha256 } from "../modules/mod.ts";
import { assertEquals } from "https://deno.land/std@0.112.0/testing/asserts.ts";

Deno.test("sha1 sha256", () => {
  const obj = { foo: "bar" };

  const sha1Hash = sha1(JSON.stringify(obj));
  const sha256Hash = sha256(JSON.stringify(obj));

  assertEquals(sha1Hash, "a5e744d0164540d33b1d7ea616c28f2fa97e754a");
  assertEquals(
    sha256Hash,
    "7a38bf81f383f69433ad6e900d35b3e2385593f76a7b7ab5d4355b8ba41ee24b",
  );
});
