import * as esbuild from 'esbuild'

await esbuild.build({
    logLevel: "info",
    entryPoints: ["src/modules/test/index.ts"],
    bundle: true,
    outfile: ".stage/modules/test/index.js",
    platform: "neutral",
    loader: {'.ts': 'ts'},
    tsconfig: "tsconfig.json",
    minify: true
})