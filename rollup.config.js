// @ts-check

import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import css from "rollup-plugin-css-only";
import svelte from "rollup-plugin-svelte";
import { terser } from "rollup-plugin-terser";
import sveltePreprocess from "svelte-preprocess";
import json from "@rollup/plugin-json";
// import nodePolyfills from "rollup-plugin-node-polyfills";
// import globals from "rollup-plugin-node-globals";
// import builtins from "rollup-plugin-node-builtins";

const production = !process.env.ROLLUP_WATCH;
// const extensions = [".mjs", ".js", ".json", ".node", ".ts"];

/**
 * @param {string} filename
 * @param {boolean} useSvelte
 */
function createConfig(filename, useSvelte = true) {
  return {
    input: `src/${filename}.ts`,
    output: {
      format: "iife",
      file: `public/build/${filename}.js`,
    },
    plugins: [
      useSvelte &&
        svelte({
          compilerOptions: {
            // enable run-time checks when not in production
            dev: !production,
          },
          preprocess: sveltePreprocess(),
        }),
      // we'll extract any component CSS out into
      // a separate file - better for performance
      css({ output: `${filename}.css` }),
      // globals(),
      // builtins(),

      // nodePolyfills(),
      // If you have external dependencies installed from
      // npm, you'll most likely need these plugins. In
      // some cases you'll need additional configuration -
      // consult the documentation for details:
      // https://github.com/rollup/plugins/tree/master/packages/commonjs
      nodeResolve({
        browser: true,
        // module: true,
        // jsnext: true,
        // preferBuiltins: true,
        // preferBuiltins: false,
        // extensions,
        // mainFields: ["jsnext:main", "main"],
        dedupe: (importee) =>
          importee === "svelte" || importee.startsWith("svelte/"),
        // dedupe: ["svelte"],
      }),
      commonjs(),

      typescript(),
      json(),

      // If we're building for production (npm run build
      // instead of npm run dev), minify
      production && terser(),
    ],
    moduleContext: {
      "./node_modules/unfurl.js/dist/index.js": "window",
    },
  };
}

export default [
  createConfig("options", true),
  createConfig("popup", true),
  createConfig("content_script", true),
];
