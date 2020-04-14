const path = require('path');
const { createConfig } = require('@bfc/test-utils');

module.exports = createConfig('client', 'react', {
  setupFilesAfterEnv: [path.resolve(__dirname, 'setupTests.ts')],
});
