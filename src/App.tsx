import React, { useEffect, useRef, useState } from 'react';
import * as esbuild from 'esbuild-wasm';

import CodeEditor from './components/CodeEditor/CodeEditor';

import unpkgPathPlugin from './plugins/unpkg-path-plugin';
import fetchPlugin from './plugins/fetch-plugin';

function App() {
  const [input, setInput] = useState<string>('');
  const ref = useRef<esbuild.Service | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    startService();
  }, []);

  async function startService() {
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: 'http://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm',
    });
  }

  async function buttonClickHandler() {
    if (!ref.current) return;

    iframeRef.current!.srcdoc = html;

    const result = await ref.current.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(input)],
      define: {
        'process.env.NODE_ENV': '"production"',
        global: 'window',
      },
    });

    iframeRef.current?.contentWindow?.postMessage(
      result.outputFiles[0].text,
      '*'
    );
  }

  const html = `
    <!DOCTYPE html>
    <html>
      <head></head>
      <body>
        <div id="root"></div>
        <script>
          window.addEventListener(
            'message',
            (event) => {
              try {
                eval(event.data);
              } catch(err) {
                const root = document.getElementById('root');
                root.innerHTML = '<div>' + err + '</div>';
                console.error(err);
              }
            },
            false
          );
        </script>
      </body>
    </html>
  `;

  return (
    <div className="app">
      <CodeEditor
        initialValue="const a = 1;"
        onChange={(value) => setInput(value)}
      />
      <textarea
        onChange={(e) => setInput(e.target.value)}
        value={input}
        name="input"
        id="input"
        cols={50}
        rows={15}
      ></textarea>
      <div>
        <button onClick={buttonClickHandler}>Submit</button>
      </div>
      <iframe
        title="preview"
        sandbox="allow-scripts"
        srcDoc={html}
        ref={iframeRef}
      />
    </div>
  );
}

export default App;
