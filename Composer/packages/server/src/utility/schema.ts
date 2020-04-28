// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import crypto from 'crypto';

import memoize from 'lodash/memoize';
import $RefParser, { JSONSchema } from '@apidevtools/json-schema-ref-parser';
import { JSONSchema7 } from '@bfc/plugin-loader';

import logger from '../logger';
const debug = logger.extend('schema');

function cacheKey(contents: string): string {
  const hash = crypto.createHash('sha1');
  return hash.update(contents).digest('hex');
}

async function resolve$refs(schema: object): Promise<JSONSchema> {
  const resolved = await $RefParser.dereference(schema as JSONSchema, { dereference: { circular: 'ignore' } });
  return resolved;
}

const processSchema = memoize(async (schema: string): Promise<JSONSchema7> => {
  debug('');
  const parsed = JSON.parse(schema);
  const resolved = (await resolve$refs(parsed)) as JSONSchema7;

  return resolved;
}, cacheKey);

export { processSchema };
