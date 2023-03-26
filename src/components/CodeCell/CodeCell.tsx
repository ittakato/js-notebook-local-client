import React, { useState } from 'react';

import CodeEditor from '../CodeEditor/CodeEditor';
import Preview from '../Preview/Preview';

import bundle from '../../bundler';

function CodeCell() {
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');

  async function buttonClickHandler() {
    const output = await bundle(input);
    setCode(output);
  }

  return (
    <div>
      <CodeEditor
        initialValue=""
        onChange={(value) => setInput(value)}
      />
      <div>
        <button onClick={buttonClickHandler}>Submit</button>
      </div>
      <Preview code={code} />
    </div>
  );
}

export default CodeCell;
