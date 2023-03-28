import React, { useState, useEffect, useRef } from 'react';
import MDEditor from '@uiw/react-md-editor';

import useActions from '../../hooks/use-actions';

import type { Cell } from '../../state';

import './TextEditor.scss';

interface TextEditorProps {
  cell: Cell;
}

function TextEditor(props: TextEditorProps) {
  const [isEditing, setIsEditing] = useState(false);

  const { updateCell } = useActions();

  const divRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function listener(event: MouseEvent) {
      if (
        divRef.current &&
        event.target &&
        divRef.current?.contains(event.target as Node)
      ) {
        return;
      }

      setIsEditing(false);
    }

    document.addEventListener('click', listener, { capture: true });

    return () => {
      document.removeEventListener('click', listener, { capture: true });
    };
  }, []);

  function MDEditorOnChangeHandler(value: string | undefined) {
    updateCell({ id: props.cell.id, content: value || '' });
  }

  if (isEditing) {
    return (
      <div ref={divRef} className="text-editor">
        <MDEditor
          value={props.cell.content}
          onChange={MDEditorOnChangeHandler}
        />
      </div>
    );
  } else {
    return (
      <div
        className="text-editor card"
        onClick={() => {
          setIsEditing(true);
        }}
      >
        <div className="card-content">
          <MDEditor.Markdown source={props.cell.content || 'Click to edit'} />
        </div>
      </div>
    );
  }
}

export default TextEditor;
