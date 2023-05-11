import * as esbuild from 'esbuild'
import copyStaticFiles from 'esbuild-copy-static-files'

await esbuild.build({
    logLevel: "info",
    entryPoints: ["src/index.ts"],
    bundle: true,
    outdir: '.stage',
    platform: "neutral",
    loader: {'.ts': 'ts', '.html': 'text'},
    tsconfig: "tsconfig.json",
    minify: true,
    plugins: [copyStaticFiles(
        {
          src: './static',
          dest: '.stage',
          dereference: true,
          errorOnExist: false,
          filter: function () { return true },
          preserveTimestamps: true,
          recursive: true,
        }
      )]
})