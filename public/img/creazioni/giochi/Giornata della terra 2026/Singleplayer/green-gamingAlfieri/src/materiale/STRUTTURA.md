Struttura della cartella del progetto: (temporanea e mmodificabile)
```text
.
├── assets/
│   ├── media/
│   │   ├── img/
│   │   │   ├── titolo.png
│   │   │   └── fase2/
│   │   │       ├── contenitori/
│   │   │       │   ├── alluminio.jpeg
│   │   │       │   ├── carta.jpeg
│   │   │       │   ├── indifferenziata.jpeg
│   │   │       │   ├── plastica.jpeg
│   │   │       │   ├── umido.jpeg
│   │   │       │   └── vetro.jpeg
│   │   │       └── rifiuti/
│   │   │           ├── bicchiereEbottiglia.webp
│   │   │           ├── bottiglie.webp
│   │   │           ├── bucciaBanana.png
│   │   │           ├── giornale.png
│   │   │           ├── lattina.png
│   │   │           ├── marmellata.png
│   │   │           ├── mozziconiSigaretta.png
│   │   │           ├── pannolino.png
│   │   │           ├── sacchettoPlastica.png
│   │   │           ├── scatolaCartone.png
│   │   │           ├── scatolaTonno.webp
│   │   │           └── torsoloMela.webp
│   │   └── video/
│   │       └── background.mp4
│   ├── models/
│   │   ├── rifiuto.glb
│   │   └── tree.glb
│   └── texture/
│       └── rifiuto/
│           ├── Trash_AlbedoTransparency.png
│           ├── Trash_Ambient_Occlusion.png
│           ├── Trash_MetallicSmoothness.png
│           ├── Trash_Normal.png
│           └── Trash_Roughness.png
├── css/
│   ├── classifica.css
│   ├── fase1.css
│   ├── fase2.css
│   ├── istruzioniFase2.css
│   └── risultatiFinali.css
├── js/
│   ├── fase1.js
│   └── fase2.js
├── materiale/
│   ├── idea gioco.drawio
│   ├── idea gioco.png
│   ├── ideaRisultato.jpeg
│   ├── progetto.txt
│   ├── schermata finale.png
│   ├── schermata iniziale.png
│   ├── STRUTTURA.md
│   └── TODO.txt
├── pages/
│   ├── classifica.php
│   ├── error.html
│   ├── fase1.html
│   ├── fase2.html
│   ├── istruzioniFase2.html
│   └── risultatiFinali.html
├── php/
│   ├── db.php
│   ├── leaderboard_utils.php
│   └── save_score.php
├── .gitignore
├── db_iniziale.sql
├── index.php
└── README.md
```

Workflow del gioco:
```
Inizio -> 60s per raccogliere i rifiuti -> Salvataggio del punteggio in localStorage -> Schermata intermedia -> <punteggio>*5s per separare i rifiuti -> Invio dati della partita al database (nome squadra, rifiuti raccolti nella fase 1, rifiuti separati correttamente nella fase 2, punteggio finale, data della partita) -> caricamento schermata finale con classifica ridotta (posizione, squadra, punteggio) e pulsanti per giocare ancora, impostazioni e la classifica completa (classifica.php) con tutti i dati e tutte le partite giocate (classifica ridotta: solo le prime 5/10 partite)
```
```
start -> mid -> sep -> end
```

Indirizzamento pagine in index.php
```
index.php?p=xxx
index.php?p=start -> include 'fase1.html' (schermata iniziale + prima fase)
index.php?p=mid -> include 'istruzioniFase2.html' (istruzioni per la seconda fase con pulsante per iniziare)
index.php?p=sep -> include 'fase2.html' (separazione dei rifiuti + reindirizzamento a schermata finale)
index.php?p=end -> include 'risultatiFinali.html' (schermata finale + record assoluto (nome squadra, punteggio finale, data) + classifica ridotta + pulsante 'gioca ancora' (-> index.php?p=start) + pulsante per classifica completa (-> _blank::index.php?p=leaderboard))
index.php?p=leaderboard -> classifica globale dei risultati con visualizzazione completa dei dati
```

Array associativo con indirizzamenti da parametri get
```php
$route = [
    'start' => 'fase1.html',
    'mid' => 'istruzioniFase2.html',
    'sep' => 'fase2.html',
    'end' => 'risultatiFinali.html',
    'leaderboard' => 'classifica.php'
]
```