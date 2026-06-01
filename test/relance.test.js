'use strict';
const test = require('node:test');
const assert = require('node:assert');
const { aRelancer } = require('../relance.js');
test('relance a partir de J+7 si impayee', () => {
  assert.strictEqual(aRelancer({ payee: false }, 7), true);
  assert.strictEqual(aRelancer({ payee: true }, 30), false);
  assert.strictEqual(aRelancer({ payee: false }, 3), false);
});
