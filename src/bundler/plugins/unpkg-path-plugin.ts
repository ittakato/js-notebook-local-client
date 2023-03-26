import * as esbuild from 'esbuild-wasm';

function unpkgPathPlugin() {
  return {
    name: 'unpkg-path-plugin',
    setup: (build: esbuild.PluginBuild) => {
      build.onResolve({ filter: /(^index\.js$)/ }, () => {
        return { path: 'index.js', namespace: 'a' };
      });

      build.onResolve({ filter: /\.+\// }, (args: esbuild.OnResolveArgs) => {
        return {
          path: String(
            new URL(args.path, `https://unpkg.com${args.resolveDir}/`)
          ),
          namespace: 'a',
        };
      });

      build.onResolve({ filter: /.*/ }, async (args: esbuild.OnResolveArgs) => {
        return {
          path: `https://unpkg.com/${args.path}`,
          namespace: 'a',
        };
      });
    },
  };
}

export default unpkgPathPlugin;
