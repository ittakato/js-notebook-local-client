import React, { useRef } from 'react';
import MonacoEditor, { type EditorDidMount } from '@monaco-editor/react';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';

import styles from './CodeEditor.module.scss';

interface CodeEditorProps {
  initialValue: string;
  onChange: (value: string) => void;
}

function CodeEditor(props: CodeEditorProps) {
  const editorRef = useRef<any>(null);

  const editorDidMountHandler: EditorDidMount = (getValue, editor) => {
    editorRef.current = editor;

    editor.onDidChangeModelContent(() => {
      props.onChange(getValue());
    });

    editor.getModel()!.updateOptions({ tabSize: 2 });
  };

  function formatHandler() {
    const unformattedCode = editorRef.current.getModel().getValue();

    const formattedCode = prettier
      .format(unformattedCode, {
        parser: 'babel',
        plugins: [parser],
        useTabs: false,
        semi: true,
        singleQuote: true,
        jsxSingleQuote: true,
      })
      .replace(/\n$/, '');

    editorRef.current.setValue(formattedCode);
  }

  return (
    <div className={styles['editor-wrapper']}>
      <button
        className={`button button-format is-primary is-small ${styles['button-format']}`}
        onClick={formatHandler}
      >
        Format
      </button>
      <MonacoEditor
        editorDidMount={editorDidMountHandler}
        value={props.initialValue}
        height="1000px"
        language="javascript"
        theme="dark"
        options={{
          wordWrap: 'on',
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />
    </div>
  );
}

export default CodeEditor;
