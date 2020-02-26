// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import React from 'react';
import { Dropdown, IDropdownOption, ResponsiveMode } from 'office-ui-fabric-react/lib/Dropdown';
import { FieldLabel } from '@bfc/adaptive-form';
import { FieldProps, useShellApi } from '@bfc/extension';
import { DialogInfo } from '@bfc/indexers';
import formatMessage from 'format-message';

const EMPTY_OPTION = { key: '', text: '' };

function luIntentOptions(currentDialog: DialogInfo): IDropdownOption[] {
  const { luIntents } = currentDialog;
  return luIntents.filter(Boolean).reduce((acc, intent) => [...acc, { key: intent, text: intent }], [EMPTY_OPTION]);
}

function regexIntentOptions(currentDialog: DialogInfo): IDropdownOption[] {
  const {
    content: { recognizer },
  } = currentDialog;
  return (recognizer?.intents || []).reduce((acc, { intent }) => [...acc, { key: intent, text: intent }], [
    EMPTY_OPTION,
  ]);
}

function recognizerType(currentDialog: DialogInfo): RecognizerType | null {
  const { recognizer } = currentDialog.content;
  if (recognizer) {
    if (typeof recognizer === 'object' && recognizer.$type === 'Microsoft.RegexRecognizer') {
      return RecognizerType.regex;
    } else if (typeof recognizer === 'string') {
      return RecognizerType.luis;
    }
  }

  return null;
}

enum RecognizerType {
  'regex',
  'luis',
}

export const SelectIntent: React.FC<FieldProps> = ({
  description,
  disabled,
  id,
  label,
  onBlur,
  onChange,
  onFocus,
  value,
  placeholder,
}) => {
  const { currentDialog } = useShellApi();

  const handleChange = (_, option): void => {
    if (option) {
      onChange(option.key);
    }
  };

  const type = recognizerType(currentDialog);

  const options =
    type === RecognizerType.luis
      ? luIntentOptions(currentDialog)
      : type === RecognizerType.regex
      ? regexIntentOptions(currentDialog)
      : [EMPTY_OPTION];

  return (
    <React.Fragment>
      <FieldLabel description={description} id={id} label={label} />
      <Dropdown
        id={id.replace(/\.|#/g, '')}
        onBlur={() => onBlur && onBlur(id, value)}
        onChange={handleChange}
        onFocus={() => onFocus && onFocus(id, value)}
        options={options}
        selectedKey={value || null}
        responsiveMode={ResponsiveMode.large}
        disabled={disabled || options.length === 1}
        placeholder={options.length > 1 ? placeholder : formatMessage('No intents configured for this dialog')}
      />
    </React.Fragment>
  );
};
