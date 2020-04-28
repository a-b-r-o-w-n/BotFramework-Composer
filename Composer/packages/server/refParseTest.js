const fs = require('fs');
const path = require('path');

const $RefParser = require('@apidevtools/json-schema-ref-parser');

const schemaPath = path.resolve(__dirname, 'schemas/sdk.schema');
const content = fs.readFileSync(schemaPath, 'utf-8');
const parsed = JSON.parse(content);

const circular = process.argv.includes('--circular');
const bundle = process.argv.includes('--bundle');
const kind = process.argv.indexOf('--kind') > 0 ? process.argv[process.argv.indexOf('--kind') + 1] : null;

async function parse(src) {
  let realSchema = src;

  if (kind) {
    realSchema = {
      ...src.definitions[kind],
      // definitions: src.definitions,
    };
  }

  if (bundle) {
    return $RefParser.bundle(realSchema);
  } else {
    return $RefParser.dereference(realSchema, { dereference: { circular: circular ? true : 'ignore' } });
  }
}

parse(parsed)
  .then(res => {
    console.log(JSON.stringify(res, null, 4));
    process.exit(0);
  })
  .catch(err => {
    console.error(err.message);
    process.exit(1);
  });
