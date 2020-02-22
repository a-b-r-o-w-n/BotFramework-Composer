// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { SDKTypes, SDKKinds, SDKRoles, ShellApi, ShellData } from '@bfc/shared';

import { FieldWidget, FieldProps } from './form';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type UIOptionFunc<R = any, D = any> = (data: D) => R;

export interface UIOptions {
  hidden?: string[] | UIOptionFunc<string[]>;
  label?: string | UIOptionFunc<string | undefined> | false;
  order?: string[] | UIOptionFunc;
  field?: FieldWidget;
  placeholder?: string | UIOptionFunc<string, undefined>;
  properties?: {
    [key: string]: UIOptions;
  };
}

export type RoleSchema = { [key in SDKRoles]?: Omit<UIOptions, 'properties'> };
export type KindSchema = { [key in SDKKinds]?: Omit<UIOptions, 'properties'> };
export type UISchema = { [key in SDKTypes]?: UIOptions };
export type RecognizerSchema = {
  id: string;
  displayName: string | UIOptionFunc<string>;
  editor?: FieldWidget;
  handleChange: (fieldProps: FieldProps, shellData: ShellData, shellApi: ShellApi) => void;
};
