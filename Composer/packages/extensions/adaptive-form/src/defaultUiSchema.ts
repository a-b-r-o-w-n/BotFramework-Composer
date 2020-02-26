// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { UISchema } from '@bfc/extension';
import { SDKTypes } from '@bfc/shared';

const globalHiddenProperties = ['$type', '$id', '$copy', '$designer', 'id'];
const triggerUiSchema = {
  order: ['condition', '*'],
  hidden: ['actions', ...globalHiddenProperties],
};

const DefaultUISchema: UISchema = {
  [SDKTypes.AdaptiveDialog]: {
    order: ['recognizer', '*'],
    hidden: ['triggers', 'autoEndDialog', 'generator', 'selector', 'schema', ...globalHiddenProperties],
  },
  [SDKTypes.BeginDialog]: {
    order: ['dialog', 'options', 'resultProperty', 'includeActivity', '*'],
    hidden: [...globalHiddenProperties],
  },
  [SDKTypes.CancelAllDialogs]: {
    order: ['dialog', 'property', '*'],
    hidden: [...globalHiddenProperties],
  },
  [SDKTypes.ConditionalSelector]: {
    hidden: [...globalHiddenProperties],
    // properties: {
    //   ifFalse: {
    //     field: 'SelectorField',
    //   },
    //   ifTrue: {
    //     field: 'SelectorField',
    //   },
    // },
  },
  [SDKTypes.DeleteProperty]: {
    hidden: [...globalHiddenProperties],
  },
  [SDKTypes.DeleteProperties]: {
    hidden: [...globalHiddenProperties],
  },
  [SDKTypes.EditActions]: {
    // properties: {
    //   actions: {
    //     field: 'StepsField',
    //   },
    // },
  },
  [SDKTypes.EditArray]: {
    hidden: [...globalHiddenProperties],
  },
  [SDKTypes.EndDialog]: {
    hidden: [...globalHiddenProperties],
  },
  [SDKTypes.EndTurn]: {
    hidden: [...globalHiddenProperties],
  },
  [SDKTypes.Foreach]: {
    order: ['itemsProperty', '*'],
    hidden: ['actions', ...globalHiddenProperties],
  },
  [SDKTypes.ForeachPage]: {
    order: ['itemsProperty', 'pageSize', '*'],
    hidden: ['actions', ...globalHiddenProperties],
  },
  [SDKTypes.HttpRequest]: {
    order: ['method', 'url', 'body', 'headers', '*'],
    hidden: [...globalHiddenProperties],
    // properties: {
    //   body: {
    //     // field: 'JsonField',
    //   },
    //   headers: {
    //     // field: 'CustomObjectField',
    //   },
    // },
  },
  [SDKTypes.IfCondition]: {
    hidden: ['actions', 'elseActions', ...globalHiddenProperties],
  },
  [SDKTypes.SetProperties]: {
    // field: 'AssignmentsField',
    // properties: {
    //   assignments: {
    //     options: {
    //       hideLabel: true,
    //       transparentBorder: true,
    //     },
    //   },
    // },
  },
  [SDKTypes.OnActivity]: {
    ...triggerUiSchema,
  },
  [SDKTypes.OnBeginDialog]: {
    ...triggerUiSchema,
  },
  [SDKTypes.OnCancelDialog]: {
    ...triggerUiSchema,
  },
  [SDKTypes.OnCondition]: {
    ...triggerUiSchema,
  },
  [SDKTypes.OnConversationUpdateActivity]: {
    ...triggerUiSchema,
  },
  [SDKTypes.OnCustomEvent]: {
    ...triggerUiSchema,
  },
  [SDKTypes.OnDialogEvent]: {
    ...triggerUiSchema,
  },
  [SDKTypes.OnEndOfConversationActivity]: {
    ...triggerUiSchema,
  },
  [SDKTypes.OnError]: {
    ...triggerUiSchema,
  },
  [SDKTypes.OnEventActivity]: {
    ...triggerUiSchema,
  },
  [SDKTypes.OnHandoffActivity]: {
    ...triggerUiSchema,
  },
  [SDKTypes.OnIntent]: {
    order: ['intent', 'condition', 'entities', '*'],
    hidden: ['actions', ...globalHiddenProperties],
    // properties: {
    //   intent: {
    //     widget: 'IntentWidget',
    //   },
    // },
  },
  [SDKTypes.OnInvokeActivity]: {
    ...triggerUiSchema,
  },
  [SDKTypes.OnMessageActivity]: {
    ...triggerUiSchema,
  },
  [SDKTypes.OnMessageDeleteActivity]: {
    ...triggerUiSchema,
  },
  [SDKTypes.OnMessageReactionActivity]: {
    ...triggerUiSchema,
  },
  [SDKTypes.OnMessageUpdateActivity]: {
    ...triggerUiSchema,
  },
  [SDKTypes.OnRepromptDialog]: {
    ...triggerUiSchema,
  },
  [SDKTypes.OnTypingActivity]: {
    ...triggerUiSchema,
  },
  [SDKTypes.OnUnknownIntent]: {
    ...triggerUiSchema,
  },
  [SDKTypes.MostSpecificSelector]: {
    hidden: [...globalHiddenProperties],
    // properties: {
    //   selector: {
    //     // field: 'SelectorField',
    //   },
    // },
  },
  [SDKTypes.OAuthInput]: {
    order: ['connectionName', '*'],
  },
  [SDKTypes.RegexRecognizer]: {
    hidden: ['entities', ...globalHiddenProperties],
  },
  [SDKTypes.ReplaceDialog]: {
    hidden: [...globalHiddenProperties],
    order: ['dialog', 'options', 'includeActivity', '*'],
  },
  [SDKTypes.RepeatDialog]: {
    hidden: [...globalHiddenProperties],
    order: ['options', 'includeActivity', '*'],
  },
  [SDKTypes.SetProperty]: {
    hidden: [...globalHiddenProperties],
  },
  [SDKTypes.SetProperties]: {
    hidden: [...globalHiddenProperties],
  },
  [SDKTypes.SwitchCondition]: {
    hidden: ['default', ...globalHiddenProperties],
    properties: {
      cases: {
        hidden: ['actions'],
      },
    },
  },
  [SDKTypes.SendActivity]: {
    hidden: [...globalHiddenProperties],
  },
};

export default DefaultUISchema;
