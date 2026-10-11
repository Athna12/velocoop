'use strict';
const TVA = 0.2;

function centimes(x) {
  return Math.round((x + Number.EPSILON) * 100) / 100;
}

function calculerDevis(lignes) {
  const ht = centimes(lignes.reduce((s, l) => s + l.pu * l.q, 0));
  const tva = centimes(ht * TVA);
  const ttc = centimes(ht + tva);
  return { ht, tva, ttc, arrondi: true };
}

module.exports = { calculerDevis, centimes, TVA };
