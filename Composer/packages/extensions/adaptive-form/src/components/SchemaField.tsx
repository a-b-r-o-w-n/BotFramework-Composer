// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React, { useContext } from 'react';
import { FieldProps } from '@bfc/extension';

import { getUISchema, resolveFieldWidget, resolveRef, getLabel } from '../utils';
import PluginContext from '../PluginContext';

import { ErrorMessage } from './ErrorMessage';

const schemaField = {
  container: (depth = 0) => css`
    margin: 10px ${depth === 0 ? 18 : 0}px;
    label: SchemaFieldContainer;
  `,
};

const getPlaceholder = (props: FieldProps): string | undefined => {
  const { uiOptions, placeholder: propPlaceholder, schema } = props;
  const placeholderOverride = uiOptions.placeholder;

  if (placeholderOverride) {
    return typeof placeholderOverride === 'function' ? placeholderOverride(props.value) : placeholderOverride;
  }

  if (propPlaceholder) {
    return propPlaceholder;
  }

  if (schema && (schema.examples || []).length > 0) {
    return `ex. ${schema.examples.join(', ')}`;
  }
};

const SchemaField: React.FC<FieldProps> = props => {
  const {
    className,
    definitions,
    name,
    schema: baseSchema,
    uiOptions: baseUIOptions = {},
    value,
    rawErrors,
    hideError,
  } = props;
  const pluginConfig = useContext(PluginContext);
  const schema = resolveRef(baseSchema, definitions);
  const uiSchema = getUISchema(schema, pluginConfig.uiSchema);
  const uiOptions = Object.keys(uiSchema).length ? uiSchema : baseUIOptions;

  if (!schema || name.startsWith('$')) {
    return null;
  }

  const error = typeof rawErrors === 'string' && <ErrorMessage error={rawErrors} label={getLabel(props)} />;

  const FieldWidget = resolveFieldWidget(schema, uiOptions, pluginConfig);
  const fieldProps = {
    ...props,
    uiOptions,
    description: schema.description,
    enumOptions: schema.enum as string[],
    label: getLabel(props),
    placeholder: getPlaceholder(props),
    schema,
    value,
    error: error || undefined,
    rawErrors: typeof rawErrors?.[name] === 'object' ? rawErrors?.[name] : undefined,
  };

  return (
    <div className={className} css={schemaField.container(props.depth)}>
      <FieldWidget {...fieldProps} />
      {!hideError && error}
    </div>
  );
};

export { SchemaField };
export default SchemaField;
