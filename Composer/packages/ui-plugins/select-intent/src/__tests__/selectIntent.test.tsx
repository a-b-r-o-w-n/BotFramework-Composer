// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import React from 'react';
import { cleanup, render } from 'react-testing-library';
import { Extension } from '@bfc/extension';

import { SelectDialog } from '../SelectDialog';

const renderSelectIntent = ({ onChange } = {}) => {
  const props = {
    description: 'Name of intent.',
    id: 'select.intent',
    label: 'Intent',
    onChange,
  };

  const shellData = {
    currentDialog: { id: 'dialog1' },
  };

  return render(
    <Extension shellData={shellData}>
      <SelectDialog {...props} />
    </Extension>
  );
};

describe('Select Dialog', () => {
  afterEach(cleanup);

  it('should display label', async () => {
    const { findByText } = await renderSelectIntent();
    await findByText('Intent');
  });
});
