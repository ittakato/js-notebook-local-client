import * as esbuild from 'esbuild-wasm';
import axios from 'axios';

function unpkgPathPlugin() {
  return {
    name: 'unpkg-path-plugin',
    setup(build: esbuild.PluginBuild) {
      build.onResolve({ filter: /.*/ }, async (args: esbuild.OnResolveArgs) => {
        console.log('onResolve', args);
        if (args.path === 'index.js') {
          return { path: args.path, namespace: 'a' };
        }

        if (args.path.includes('./') || args.path.includes('../')) {
          return {
            path: String(
              new URL(args.path, `https://unpkg.com${args.resolveDir}/`)
            ),
            namespace: 'a',
          };
        }

        return {
          path: `https://unpkg.com/${args.path}`,
          namespace: 'a',
        };
      });

      build.onLoad({ filter: /.*/ }, async (args: esbuild.OnLoadArgs) => {
        console.log('onLoad', args);

        if (args.path === 'index.js') {
          return {
            loader: 'jsx',
            contents: `
              const message = require('nested-test-pkg');
              console.log(message);
            `,
          };
        }

        const response = await axios.get(args.path);
        const data = response.data;

        const responseRequest: XMLHttpRequest = response.request;
        const responseURL = responseRequest.responseURL;
        const relativePathToPackage = new URL('./', responseURL).pathname;

        return {
          loader: 'jsx',
          contents: data,
          resolveDir: relativePathToPackage,
        };
      });
    },
  };
}

export default unpkgPathPlugin;
