import React, { useEffect, useRef, useState } from 'react';
import * as esbuild from 'esbuild-wasm';

import unpkgPathPlugin from './plugins/unpkg-path-plugin';

function App() {
  const [input, setInput] = useState<string>('');
  const [code, setCode] = useState<string>('');
  const ref = useRef<esbuild.Service | null>(null);

  async function startService() {
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: '/esbuild.wasm',
    });
  }

  async function buttonClickHandler() {
    if (!ref.current) return;

    const result = await ref.current.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin()],
    });

    setCode(result.outputFiles[0].text);
  }

  useEffect(() => {
    startService();
  }, []);

  return (
    <div className="app">
      <textarea
        onChange={(e) => setInput(e.target.value)}
        value={input}
        name="input"
        id="input"
        cols={30}
        rows={10}
      ></textarea>
      <div>
        <button onClick={buttonClickHandler}>Submit</button>
      </div>
      <pre>{code}</pre>
    </div>
  );
}

export default App;
