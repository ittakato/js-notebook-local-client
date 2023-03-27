import React, { useState, useEffect, useRef } from 'react';
import MDEditor from '@uiw/react-md-editor';

import './TextEditor.scss';

// interface TextEditorProps {

// }

function TextEditor() {
  const [isEditing, setIsEditing] = useState(true);
  const [value, setValue] = useState('# Header');

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

  function editorOnChangeHandler(value: string | undefined) {
    setValue(value || '');
  }

  if (isEditing) {
    return (
      <div ref={divRef} className="text-editor">
        <MDEditor value={value} onChange={editorOnChangeHandler} />
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
          <MDEditor.Markdown source={value} />
        </div>
      </div>
    );
  }
}

export default TextEditor;
