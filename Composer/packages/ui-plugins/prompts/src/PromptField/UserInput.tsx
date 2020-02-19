// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** @jsx jsx */
import { jsx } from '@emotion/core';
import React, { Fragment } from 'react';
import formatMessage from 'format-message';
import { JSONSchema4 } from 'json-schema';
import { SDKTypes, MicrosoftInputDialog, ChoiceInput, ConfirmInput } from '@bfc/shared';
import { SchemaField } from '@bfc/adaptive-form';

import { PromptFieldProps } from './types';
import { ChoiceInputSettings } from './ChoiceInputSettings';
import { ConfirmInputSettings } from './ConfirmInputSettings';

const getOptions = (enumSchema: JSONSchema4) => {
  if (!enumSchema || !enumSchema.enum || !Array.isArray(enumSchema.enum)) {
    return [];
  }

  return enumSchema.enum.map(o => o as string);
};

const UserInput: React.FC<PromptFieldProps<MicrosoftInputDialog>> = props => {
  const { onChange, getSchema, value, id, uiOptions, ...rest } = props;

  return (
    <Fragment>
      <SchemaField
        {...rest}
        id={`${id}.property`}
        label={formatMessage('Property to fill')}
        schema={getSchema('property')}
        uiOptions={uiOptions.properties?.property || {}}
        value={value?.property}
        onChange={onChange('property')}
      />
      {getSchema('outputFormat') && (
        <SchemaField
          {...rest}
          id={`${id}.outputFormat`}
          label={formatMessage('Output Format')}
          schema={getSchema('outputFormat')}
          uiOptions={uiOptions.properties?.outputFormat || {}}
          value={value?.outputFormat}
          onChange={onChange('outputFormat')}
        />
      )}
      {getSchema('defaultLocale') && (
        <SchemaField
          {...rest}
          id={`${id}.defaultLlocale`}
          label={formatMessage('Default locale')}
          schema={getSchema('defaultLocale')}
          uiOptions={uiOptions.properties?.defaultLocale || {}}
          value={((value as unknown) as ChoiceInput).defaultLocale}
          onChange={onChange('defaultLocale')}
        />
      )}
      {getSchema('style') && (
        <SchemaField
          {...rest}
          enumOptions={getOptions(getSchema('style'))}
          id={`${id}.style`}
          label={formatMessage('List style')}
          schema={getSchema('style')}
          uiOptions={uiOptions.properties?.style || {}}
          value={((value as unknown) as ChoiceInput).style}
          onChange={onChange('style')}
        />
      )}
      {value?.$type === SDKTypes.ChoiceInput && (
        <ChoiceInputSettings {...props} value={(value as unknown) as ChoiceInput} />
      )}
      {value?.$type === SDKTypes.ConfirmInput && (
        <ConfirmInputSettings {...props} value={(value as unknown) as ConfirmInput} />
      )}
    </Fragment>
  );
};

export { UserInput };
