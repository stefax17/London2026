// Archivio condiviso per la pagina "Londra 2026".
// Da incollare in un Google Sheet: Estensioni > Apps Script.
// Ogni riga del foglio "dati" è una spunta, un voto o una proposta per la checklist.

const SHEET_NAME = 'dati';
const HEADER = ['chiave', 'valore', 'persona', 'descrizione', 'aggiornato'];

// Eseguila una volta dall'editor per autorizzare lo script e creare il foglio.
function setup() {
  getSheet_();
}

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) {
    sh = ss.insertSheet(SHEET_NAME);
    sh.appendRow(HEADER);
    sh.setFrozenRows(1);
    sh.getRange('A:D').setNumberFormat('@');
    sh.setColumnWidth(1, 220);
    sh.setColumnWidth(4, 320);
  }
  return sh;
}

function readAll_(sh) {
  const vals = sh.getDataRange().getValues();
  const out = {};
  for (let i = 1; i < vals.length; i++) {
    const key = vals[i][0];
    if (key) out[key] = { v: String(vals[i][1]), p: String(vals[i][2]) };
  }
  return out;
}

// Evita che un testo venga interpretato come formula dal foglio.
function clean_(s, max) {
  s = String(s || '').slice(0, max);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function doGet(e) {
  const p = (e && e.parameter) || {};
  const sh = getSheet_();

  if (p.action === 'set') {
    const key = String(p.key || '');
    if (key.length > 100 || !/^(chk|like|must|sug)\|[A-Za-z0-9|_-]+$/.test(key)) {
      return json_({ ok: false, error: 'chiave non valida' });
    }
    const person = String(p.person || '');
    if (!/^[A-Z]{2,3}$/.test(person)) {
      return json_({ ok: false, error: 'iniziali non valide' });
    }
    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      const max = key.indexOf('sug|') === 0 ? 200 : 40;
      const rec = [key, clean_(p.value, max), person, clean_(p.desc, 200), new Date()];
      const last = sh.getLastRow();
      const keys = last > 1 ? sh.getRange(2, 1, last - 1, 1).getValues() : [];
      let row = -1;
      for (let i = 0; i < keys.length; i++) {
        if (keys[i][0] === key) { row = i + 2; break; }
      }
      if (row > 0) sh.getRange(row, 1, 1, rec.length).setValues([rec]);
      else sh.appendRow(rec);
    } finally {
      lock.releaseLock();
    }
  }

  return json_({ ok: true, data: readAll_(sh) });
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
