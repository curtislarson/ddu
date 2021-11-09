import { parse } from "https://cdn.skypack.dev/java-parser?dts";

export const parseJavaFile = (javaFileContent: string) => {
  const cst = parse(javaFileContent);
  console.log("java", { cst });
};
