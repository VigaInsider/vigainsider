# 🌍 Save the Island - Progetto per la Giornata della Terra

**Save the Island** è un videogioco web in 3D nato per sensibilizzare gli utenti sulla gestione dei rifiuti e l'importanza del riciclo. Il progetto adotta un'architettura Fullstack basata su **XAMPP** per la gestione di una classifica globale e il salvataggio dei record.

---

## 🛠️ Architettura Tecnica
* **Entrypoint:** `index.php` (Pagina di atterraggio con trailer e controlli).
* **Backend:** PHP + MySQL (XAMPP) per la gestione del database e dei punteggi.
* **Frontend:** **Three.js** (motore 3D), JavaScript (ES6+), CSS3.
* **Trasferimento Dati:** Utilizzo di Cookie temporanei o `localStorage` per mantenere i dati tra le diverse fasi di gioco.

---

## 🗺️ Roadmap di Sviluppo

### 🚩 Milestone Generali (Nucleo del Progetto)
- [✅] **Design UI & Mockup:** Finalizzazione degli asset grafici (basati sullo schema Draw.io).
- [✅] **Configurazione Database:** Creazione delle tabelle `classifica` e `records` su MySQL.
- [✅] **Logica Entrypoint:** Sviluppo di `index.php` con video di sfondo e overlay dei comandi.
- [✅] **Sistema di Trasferimento:** Implementazione logica per il passaggio dei dati dalla Fase 1 alla Fase 2.
- [❌] **Gestione Impostazioni:** Pannello per regolare il volume e inserire il nome della squadra (servira' nella classifica).
- [✅] **Pagina Dinamica:** Creazione della classifica in PHP con recupero dati in tempo reale.

### 🏝️ Fase 1: La Raccolta (Timer: 1m)
- [✅] **Ambiente di gioco:** Modellazione dell'isola 3D con Three.js e gestione dei confini della mappa.
- [✅] **Sistema di Spawn:** Posizionamento casuale dei rifiuti su 20 coordinate casuali.
- [✅] **Sistema Ostacoli:** Inserimento di modelli 3D di alberi e oggetti ambientali decorativi.
- [✅] **Meccaniche di Raccolta:** Gestione delle collisioni e incremento del punteggio ecologico.
- [✅] **Interfaccia (HUD):** Overlay con Timer (60s), contatore rifiuti e disattivazione della pausa.
- [✅] **Schermata di caricamento:** Schermata di caricamento iniziale
- [✅] **Schermata iniziale:** Schermata iniziale
- [❌] **Rifinitura (Polish):** Animazioni di raccolta e ottimizzazione delle mesh 3D.
- [✅] **Timer:** Meccanica del timer per il tempo di raccolta dei rifiuti
- [❌] **Personaggio:** Cilindro che rappresenta il personaggio (fatto per collisioni piu' precise)

### ♻️ Fase 2: Lo Smistamento (Timer: 5s * Punteggio)
- [✅] **Timer Dinamico:** Calcolo del tempo a disposizione basato sul successo della Fase 1.
- [✅] **Motore di Smistamento:** Logica di convalida (Rifiuto ↔️ Bidone corretto).
- [✅] **Interfaccia Utente:** Layout con i 6 bidoni (Plastica, Umido, Indifferenziata, Vetro, Carta, Alluminio).
- [✅] **Gestione Input:** Meccanica di interazione tramite Drag & Drop o selezione rapida.
- [✅] **Feedback Visivo:** Effetti sonori e visivi per risposte corrette o errate.
- [❌] **Rifinitura (Polish):** Abbellimento grafico.

### 🏆 Fase Finale: Classifica & Record
- [✅] **Calcolo Punteggio:** Elaborazione dei risultati finali e calcolo dei bonus velocità.
- [✅] **Verifica Record:** Confronto del punteggio con il record personale salvato.
- [✅] **Classifica Globale:** Script PHP per l'invio e la visualizzazione della Top 10 dal database.
- [✅] **Classifica completa:** Pagina PHP per visualizzare la classifica di tutte le partite dal database.
- [✅] **Schermata Game Over:** Riepilogo statistiche e opzione per riavviare la partita.

---

## 📂 Struttura delle Cartelle
* `/assets` - Modelli 3D, video loop, texture dei rifiuti e icone dei bidoni.
* `/css` - Fogli di stile per i menu e l'interfaccia di gioco (HUD).
* `/js` - Logica delle due fasi del gioco (fase1.js, fase2.js).
* `/php` - Script per il backend (`db_connect.php`, `save_score.php`).
* `/pages` - Pagine HTML dedicate alle varie pagine del gioco (`fase1.html`, `fase2.html`).
* `index.php` - Homepage e controller principale del progetto.