'use strict';
// Relance d'une facture impayee a J+7.
function aRelancer(facture, jours) { return !facture.payee && jours >= 7; }
module.exports = { aRelancer };
