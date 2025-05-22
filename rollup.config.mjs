import { babel } from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import replace from "@rollup/plugin-replace";
import postcss from "rollup-plugin-postcss";
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";

import pkg from "./package.json" with { type: "json" };

export default [
  {
    input: "src/index.tsx",
    output: [
      {
        file: pkg.main,
        format: "cjs",
        sourcemap: true,
        exports: 'auto',
        strict: true,
        globals: {
          react: "React",
        }
      },
      {
        file: pkg.module,
        format: "esm",
        sourcemap: true,
        strict: true,
        globals: {
          react: "React",
        }
      },
    ],
    plugins: [
      terser(),
      resolve({
        moduleDirectories: ["node_modules"],
      }),
      babel({
        babelHelpers: "bundled",
        exclude: "node_modules/**",
        presets: ["@babel/preset-react"],
      }),
      typescript({
        tsconfig: "./tsconfig.json"
      }),
      commonjs(),
      replace({
        preventAssignment: false,
      }),
      postcss({
        plugins: [],
      }),
    ],
    external: ["react"],
  },
  {
    input: 'src/index.tsx',
    output: [
      {
        file: pkg.umd,
        format: "umd",
        globals: {
          react: "React",
        },
        strict: true,
        sourcemap: false,
        name: "ReactCardCarousel",
      }
    ],
    plugins: [
      terser(),
      resolve(),
      typescript({
        tsconfig: "./tsconfig.json"
      }),
      babel({
        babelHelpers: "bundled",
        exclude: "node_modules/**",
        presets: ["@babel/preset-react"],
      }),
      postcss({
        plugins: [],
      }),
    ],
    external: ["react"],
  }
];