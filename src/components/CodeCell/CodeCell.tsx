import React, { useState, useEffect } from 'react';

import CodeEditor from '../CodeEditor/CodeEditor';
import Preview from '../Preview/Preview';
import Resizable from '../Resizable/Resizable';
import bundle from '../../bundler';
import useActions from '../../hooks/use-actions';

import type { Cell } from '../../state';

import './CodeCell.scss';

interface CodeCellProps {
  cell: Cell;
}

function CodeCell(props: CodeCellProps) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const { updateCell } = useActions();

  useEffect(() => {
    const timer = setTimeout(async () => {
      const output = await bundle(props.cell.content);
      setCode(output.code);
      setError(output.error);
    }, 750);

    return () => {
      clearTimeout(timer);
    };
  }, [props.cell.content]);

  function codeEditorOnChangeHandler(value: string) {
    updateCell({ id: props.cell.id, content: value });
  }

  return (
    <Resizable direction="vertical">
      <div className="code-cell-inner-container">
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue={props.cell.content}
            onChange={codeEditorOnChangeHandler}
          />
        </Resizable>
        <Preview code={code} error={error} />
      </div>
    </Resizable>
  );
}

export default CodeCell;
