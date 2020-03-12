// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React, { useState, useEffect, useMemo } from 'react';
import Editor, { EditorDidMount, EditorProps, Monaco, monaco } from '@monaco-editor/react';
import { NeutralColors, SharedColors } from '@uifabric/fluent-theme';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import formatMessage from 'format-message';

import { assignDefined } from './utils/common';

const defaultOptions = {
  scrollBeyondLastLine: false,
  wordWrap: 'off',
  fontFamily: 'Segoe UI',
  fontSize: 14,
  lineNumbers: 'off',
  quickSuggestions: false,
  minimap: {
    enabled: false,
  },
  lineDecorationsWidth: 10,
  lineNumbersMinChars: 0,
  glyphMargin: false,
  folding: false,
  renderLineHighlight: 'none',
};

const styles = {
  container: ({ hovered, focused, error, height }) => {
    let borderColor = NeutralColors.gray120;

    if (hovered) {
      borderColor = NeutralColors.gray160;
    }

    if (focused) {
      borderColor = SharedColors.cyanBlue10;
    }

    if (error) {
      borderColor = SharedColors.red20;
    }

    return css`
      border-width: ${focused ? '2px' : '1px'};
      padding: ${focused ? 0 : '1px'};
      border-style: solid;
      border-color: ${borderColor};
      transition: border-color 0.1s linear;
      box-sizing: border-box;
      height: calc(${typeof height === 'string' ? height : `${height}px`} - ${error ? 32 : 0}px);
    `;
  },
};

export interface BaseEditorProps extends EditorProps {
  errorMessage?: any;
  helpURL?: string;
  hidePlaceholder?: boolean;
  onChange: (newValue: string) => void;
  placeholder?: string;
  value?: string;
  onInit?: (instance: Monaco) => void;
}

const BaseEditor: React.FC<BaseEditorProps> = props => {
  const {
    onChange,
    editorDidMount,
    placeholder,
    hidePlaceholder,
    value,
    errorMessage,
    helpURL,
    height = '100%',
    onInit,
    ...rest
  } = props;
  const options = assignDefined(defaultOptions, props.options);

  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [editor, setEditor] = useState<any>();
  const initialValue = useMemo(() => value || (hidePlaceholder ? '' : placeholder), []);

  const onEditorMount: EditorDidMount = (getValue, editor) => {
    setEditor(editor);

    if (typeof editorDidMount === 'function') {
      editorDidMount(getValue, editor);
    }
  };

  useEffect(() => {
    monaco.init().then(instance => {
      typeof onInit === 'function' && onInit(instance);
    });
  }, []);

  useEffect(() => {
    if (editor) {
      const onFocusListener = editor.onDidFocusEditorWidget(() => {
        setFocused(true);
      });

      const onBlurListener = editor.onDidBlurEditorWidget(() => {
        setFocused(false);
      });

      return () => {
        onFocusListener.dispose();
        onBlurListener.dispose();
      };
    }
  }, [editor]);

  useEffect(() => {
    if (editor) {
      const disposable = editor.onDidChangeModelContent(() => {
        onChange(editor.getValue());
      });

      return () => {
        disposable.dispose();
      };
    }
  }, [onChange, editor]);

  const errorHelp =
    errorMessage &&
    formatMessage.rich('{errorMessage}. Refer to the syntax documentation<a>here</a>.', {
      errorMessage,
      a: ({ children }) => (
        <a key="a" href={helpURL} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      ),
    });

  return (
    <React.Fragment>
      <div
        css={styles.container({ hovered, focused, error: !!errorMessage, height })}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <Editor {...rest} value={initialValue || ''} editorDidMount={onEditorMount} options={options} />
      </div>
      {!!errorHelp && (
        <MessageBar
          messageBarType={MessageBarType.error}
          isMultiline={false}
          dismissButtonAriaLabel={formatMessage('Close')}
          truncated
          overflowButtonAriaLabel={formatMessage('See more')}
        >
          {errorHelp}
        </MessageBar>
      )}
    </React.Fragment>
  );
};

BaseEditor.defaultProps = {
  language: 'markdown',
  theme: 'vs',
};

export { BaseEditor };
