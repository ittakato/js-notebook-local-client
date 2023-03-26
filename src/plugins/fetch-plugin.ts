import * as esbuild from 'esbuild-wasm';
import axios from 'axios';
import localforage from 'localforage';

const fileCache = localforage.createInstance({
  name: 'filecache',
});

function fetchPlugin(inputCode: string) {
  return {
    name: 'fetch-plugin',
    setup: (build: esbuild.PluginBuild) => {
      build.onLoad({ filter: /(^index\.js$)/ }, () => {
        return {
          loader: 'jsx',
          contents: inputCode,
        };
      });

      build.onLoad({ filter: /.*/ }, async (args: esbuild.OnLoadArgs) => {
        const cachedData = await fileCache.getItem<esbuild.OnLoadResult>(
          args.path
        );
        if (cachedData) {
          return cachedData;
        }
      });

      build.onLoad({ filter: /(\.css$)/ }, async (args: esbuild.OnLoadArgs) => {
        const response = await axios.get(args.path);

        const data = response.data;

        const responseRequest: XMLHttpRequest = response.request;
        const responseURL = responseRequest.responseURL;
        const relativePathToPackage = new URL('./', responseURL).pathname;

        const escapedCSS = data
          .replace(/\n/g, '')
          .replace(/"/g, '\\"')
          // eslint-disable-next-line quotes
          .replace(/'/g, "\\'");
        const contents = `
          const style = document.createElement('style');
          style.innerText = '${escapedCSS}';
          document.head.appendChild(style);
        `;

        const result: esbuild.OnLoadResult = {
          loader: 'jsx',
          contents,
          resolveDir: relativePathToPackage,
        };

        // await fileCache.setItem(args.path, result);

        return result;
      });

      build.onLoad({ filter: /.*/ }, async (args: esbuild.OnLoadArgs) => {
        const response = await axios.get(args.path);

        const data = response.data;
        const responseRequest: XMLHttpRequest = response.request;
        const { responseURL } = responseRequest;
        const relativePathToPackage = new URL('./', responseURL).pathname;

        const result: esbuild.OnLoadResult = {
          loader: 'jsx',
          contents: data,
          resolveDir: relativePathToPackage,
        };

        // await fileCache.setItem(args.path, result);

        return result;
      });
    },
  };
}

export default fetchPlugin;
