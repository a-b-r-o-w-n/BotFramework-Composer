// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { UISchema, UIOptions } from '@bfc/extension';
import { JSONSchema4 } from 'json-schema';
/**
 * Merges overrides into default ui schema and returns the UIOptions
 */
export function getUISchema(schema?: JSONSchema4, uiSchema?: UISchema): UIOptions {
  const kind = schema?.properties?.$kind?.const;
  const type = schema?.properties?.$type?.const;

  if (uiSchema) {
    if (type && uiSchema[type]) {
      return uiSchema[type];
    } else if (kind && uiSchema[kind]) {
      return uiSchema[kind];
    }
  }

  return {};
}
