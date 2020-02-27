// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// @ts-nocheck

import React from 'react';
import { cleanup, fireEvent, getAllByRole, render } from 'react-testing-library';
import { Extension } from '@bfc/extension';

import { SelectIntent } from '../SelectIntent';

const renderSelectIntent = (props = {}, content = {}) => {
  const props = {
    description: 'Name of the dialog to call.',
    id: 'select.dialog',
    label: 'Dialog name',
    ...props,
  };

  const shellData = {
    currentDialog: {
      id: 'dialog',
      content,
      luFiles: [
        {
          id: 'dialog',
          intents: [{ Name: 'Greeting' }, { Name: 'Cancel' }],
        },
      ],
    },
  };
  return render(
    <Extension shell={{}} shellData={shellData}>
      <SelectIntent {...props} />
    </Extension>
  );
};

describe('Select Dialog', () => {
  afterEach(cleanup);

  it('should select regex recognizer intent', async () => {
    const onChange = jest.fn();

    const content = {
      currentDialog: {
        content: {
          recognizer: {
            $type: 'Microsoft.RegexRecognizer',
            intents: [{ intent: 'Greeting' }, { intent: 'Cancel' }],
          },
        },
      },
    };

    const props = { onChange };

    const { baseElement, findByRole } = renderSelectIntent(content, props);
    const dropdown = await findByRole('listbox');
    fireEvent.click(dropdown);

    const intents = await getAllByRole(baseElement, 'option');
    fireEvent.click(intents[intents.length - 1]);

    expect(onChange).toHaveBeenCalledWith('Cancel');
  });

  it('should display label', async () => {
    const { findByText } = await renderSelectIntent();
    await findByText('Dialog name');
  });
});
