import { babel } from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import replace from "@rollup/plugin-replace";
import postcss from "rollup-plugin-postcss";
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";

import pkg from "./package.json" assert { type: "json" };

export default {
  input: "src/index.tsx",
  output: [
    {
      file: pkg.main,
      format: "cjs",
      plugins: [terser()],
    },
    {
      file: pkg.module,
      format: "esm",
      plugins: [terser()],
    },
  ],
  plugins: [
    resolve({
      moduleDirectories: ["node_modules"],
    }),
    babel({
      babelHelpers: "bundled",
      exclude: "node_modules/**",
      presets: ["@babel/preset-react"],
    }),
    typescript(),
    commonjs(),
    replace({
      preventAssignment: false,
    }),
    postcss({
      plugins: [],
    }),
  ],
  external: ["react"],
};
