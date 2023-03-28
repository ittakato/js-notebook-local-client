import React, { useEffect } from 'react';

import CodeEditor from '../CodeEditor/CodeEditor';
import Preview from '../Preview/Preview';
import Resizable from '../Resizable/Resizable';
import { cellSliceActions, createBundle } from '../../state';
import {
  useTypedDispatch,
  useTypedSelector,
} from '../../hooks/use-typed-selector';
import useCumulativeCode from '../../hooks/use-cumulative-code';

import type { Cell } from '../../state';

import './CodeCell.scss';

interface CodeCellProps {
  cell: Cell;
}

function CodeCell(props: CodeCellProps) {
  const dispatch = useTypedDispatch();
  const bundle = useTypedSelector((state) => state.bundle[props.cell.id]);
  const cumulativeCode = useCumulativeCode(props.cell.id);

  useEffect(() => {
    if (!bundle) {
      dispatch(createBundle(props.cell.id, cumulativeCode));
      return;
    }

    const timer = setTimeout(async () => {
      dispatch(createBundle(props.cell.id, cumulativeCode));
    }, 750);

    return () => {
      clearTimeout(timer);
    };
  }, [props.cell.id, cumulativeCode]);

  function codeEditorOnChangeHandler(value: string) {
    dispatch(
      cellSliceActions.updateCell({ id: props.cell.id, content: value })
    );
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
        <div className="progress-wrapper">
          {!bundle || bundle.loading ? (
            <div className="progress-cover">
              <progress className="progress is-small is-primary" max={100}>
                Loading
              </progress>
            </div>
          ) : (
            <Preview code={bundle.code} error={bundle.error} />
          )}
        </div>
      </div>
    </Resizable>
  );
}

export default CodeCell;
