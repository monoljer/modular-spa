import esbuild from 'esbuild'
import copyStaticFiles from 'esbuild-copy-static-files'

let ctx = await esbuild.context({
  entryPoints: [
    'src/index.ts',
    'src/modules/test/index.ts',
    'src/modules/dashboard/index.ts',
    //'src/index.html'
  ],
  bundle: true,
  outdir: '.live',
  platform: "neutral",
  loader: {'.ts': 'ts', '.html': 'text'},
  tsconfig: "tsconfig.json",
  color: true,
  plugins: [copyStaticFiles(
    {
      src: './static',
      dest: '.live',
      dereference: true,
      errorOnExist: false,
      filter: function () { return true },
      preserveTimestamps: true,
      recursive: true,
    }
  )]
});

await ctx.watch().then(() => {
  console.log('Watching for changes...');
});

await ctx.serve({
  servedir: '.live',
  port: 4000,
  host: 'localhost'
}).then((server) => {
  console.log(`Serving on ${server.host}:${server.port}...`);
});
