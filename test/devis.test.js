'use strict';
const test = require('node:test');
const assert = require('node:assert');
const { calculerDevis } = require('../devis.js');

test('un forfait a 28 EUR HT donne 5,60 de TVA et 33,60 TTC', () => {
  const d = calculerDevis([{ pu: 20, q: 1 }, { pu: 8, q: 1 }]);
  assert.strictEqual(d.ht, 28);
  assert.strictEqual(d.tva, 5.6);
  assert.strictEqual(d.ttc, 33.6);
});
