'use strict';
const { calculerDevis } = require('./devis.js');

function numero(annee, rang) {
  return 'VC-' + annee + '-' + String(rang).padStart(4, '0');
}

function facture(annee, rang, lignes) {
  return { ref: numero(annee, rang), ...calculerDevis(lignes) };
}

module.exports = { facture, numero };
