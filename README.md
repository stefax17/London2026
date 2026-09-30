# Londra 2026

Pagina di viaggio (4–7 dicembre 2026): logistica, checklist condivisa, cose da vedere da votare e programma.

- `index.html`: la pagina
- `config.js`: l'indirizzo dell'archivio condiviso (Google Sheet)
- `apps-script/Code.gs`: lo script da incollare nel Google Sheet

## Attivazione (una volta sola)

### 1. Archivio condiviso su Google Sheet
1. Crea un nuovo Google Sheet, per esempio "Londra 2026".
2. Menu **Estensioni > Apps Script**. Cancella il contenuto e incolla tutto `apps-script/Code.gs`. Salva.
3. In alto scegli la funzione `setup` e premi **Esegui**. Autorizza con il tuo account (se compare "App non verificata": Avanzate > Vai al progetto).
4. **Esegui il deployment > Nuovo deployment**, tipo **App web**:
   - Esegui come: **Me**
   - Chi ha accesso: **Chiunque**
5. Premi Esegui il deployment e copia l'**URL dell'app web** (finisce con `/exec`).
6. Incolla l'URL in `config.js` tra le virgolette di `apiUrl`.

Nel foglio "dati" compare una riga per ogni spunta o voto, con iniziali e data.

### 2. Pubblicazione con GitHub Pages
1. Repo su GitHub > **Settings > General > Danger Zone > Change visibility > Public**.
2. **Settings > Pages**: Source "Deploy from a branch", scegli il branch con la pagina e la cartella `/ (root)`, Save.
3. Dopo un minuto la pagina è su `https://stefax17.github.io/London2026/`: quello è il link da mandare su WhatsApp.

## Note
- Chi apre il link non deve registrarsi: la prima volta che vota inserisce le proprie iniziali. Sullo stesso telefono si cambia persona con "cambia".
- Chiunque abbia il link può spuntare e votare: non girarlo fuori dal gruppo.
- Nella pagina non ci sono nomi, codici di prenotazione o indirizzo dell'alloggio.
