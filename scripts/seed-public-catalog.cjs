const fs = require('node:fs');
const path = require('node:path');
const Database = require('better-sqlite3');

const snapshot = require('../catalog-snapshots/2026-27-topps-flagship.json');
const tables = {
  sets: 'id TEXT PRIMARY KEY, name TEXT, category TEXT, has_autograph INTEGER, has_relic INTEGER, expected_count INTEGER, display_order INTEGER',
  cards: 'id TEXT PRIMARY KEY, set_id TEXT REFERENCES sets(id), card_number TEXT, is_rookie INTEGER, player_name TEXT, team_name TEXT',
  subjects: 'card_id TEXT REFERENCES cards(id), position INTEGER, display_name TEXT, team_name TEXT',
  variants: 'id TEXT PRIMARY KEY, card_id TEXT REFERENCES cards(id), name TEXT, kind TEXT, status TEXT, print_run INTEGER, source_page INTEGER',
  evidence: 'entity_id TEXT, entity_type TEXT, page INTEGER, locator TEXT, excerpt TEXT, status TEXT, source_url TEXT',
  issues: 'card_id TEXT REFERENCES cards(id), kind TEXT, detail TEXT',
};

const db = new Database(':memory:');
db.transaction(() => {
  for (const [table, schema] of Object.entries(tables)) {
    db.exec('CREATE TABLE ' + table + '(' + schema + ')');
    const fields = db.prepare('PRAGMA table_info(' + table + ')').all();
    const insert = db.prepare('INSERT INTO ' + table + ' VALUES (' + fields.map(() => '?').join(',') + ')');
    for (const row of snapshot[table]) insert.run(...row);
  }
  db.exec('CREATE INDEX cards_by_set ON cards(set_id); CREATE INDEX subjects_by_card ON subjects(card_id,position); CREATE INDEX variants_by_card ON variants(card_id); CREATE INDEX evidence_by_entity ON evidence(entity_id);');
})();
const target = path.resolve('data/demo/flagship-public.sqlite');
fs.mkdirSync(path.dirname(target), {recursive:true});
fs.writeFileSync(target, db.serialize());
db.close();
console.log('Prepared public Flagship catalog:', snapshot.cards.length, 'main card slots.');
