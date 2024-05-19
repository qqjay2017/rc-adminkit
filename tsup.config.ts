import { Options, defineConfig } from "tsup";
import { lessLoader } from "esbuild-plugin-less";

const baseConfig: Options = {
  format: ["cjs", "esm"],
  target: "es2016",
  external: ["react", "react-dom", "antd"],
  sourcemap: true,
  minify: true,
  clean: true,
  dts: true,
  splitting: false,
  treeshake: true,
  injectStyle: false,
  esbuildPlugins: [lessLoader()],
};

/**
 * themes.map((fn) => `./src/lib/themes/${fn}/${fn}.ts`)
 */
export default defineConfig([
  {
    ...baseConfig,
    entry: ["./src/lib/index.ts"],
    outDir: "dist",
  }
]);
