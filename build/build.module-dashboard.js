import * as esbuild from 'esbuild'

await esbuild.build({
    logLevel: "info",
    entryPoints: ["src/modules/dashboard/index.ts"],
    bundle: true,
    outfile: ".stage/modules/dashboard/index.js",
    platform: "neutral",
    loader: {'.ts': 'ts'},
    tsconfig: "tsconfig.json",
    minify: true
})