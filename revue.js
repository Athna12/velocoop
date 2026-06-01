'use strict';
// Grille de revue croisee, appliquee a une branche par rapport a main.
// Usage : node revue.js <branche>
const { execFileSync } = require('child_process');
const q = (a) => execFileSync('git', a, { encoding: 'utf8' }).trimEnd();
const branche = process.argv[2];
if (!branche) { console.error('usage : node revue.js <branche>'); process.exit(2); }
const base = q(['merge-base', 'main', branche]);
const messages = q(['log', '--format=%s', base + '..' + branche]).split('\n').filter(Boolean);
const fichiers = q(['diff', '--name-only', base + '..' + branche]).split('\n').filter(Boolean);
const stat = q(['diff', '--shortstat', base + '..' + branche]);
const lignes = (stat.match(/(\d+) insertion/) ? +RegExp.$1 : 0)
  + (/(\d+) deletion/.test(stat) ? +RegExp.$1 : 0);
const motif = /^(feat|fix|docs|test|chore|refactor|perf|ci|build|style)(\([a-z0-9-]+\))?: .{1,60}$/;

const criteres = [
  ['messages conventionnels', messages.every((m) => motif.test(m)), 4],
  ['des tests touches', fichiers.some((f) => /test/.test(f)), 4],
  ['aucun secret (.env)', !fichiers.includes('.env'), 4],
  ['aucun fichier genere', !fichiers.some((f) => /^(logs|rapports|node_modules)\//.test(f)), 4],
  ['diff sous 200 lignes (' + lignes + ')', lignes < 200, 4],
];
let note = 0;
console.log('Revue de ' + branche + ' (' + messages.length + ' commits, ' + fichiers.length + ' fichiers)');
for (const [nom, ok, pts] of criteres) {
  if (ok) note += pts;
  console.log('  [' + (ok ? 'ok' : '--') + '] ' + nom + '  ' + (ok ? pts : 0) + '/' + pts);
}
console.log('Note de revue : ' + note + ' / 20');
process.exit(note === 20 ? 0 : 1);
