# Benvenuti su Vigainsider

Grazie per il tuo contributo al progetto!
Per mantenere un flusso di lavoro pulito, stabile e coordinato, **tutti gli sviluppatori devono seguire queste regole operative**.

## 1. Requisiti

Prima di contribuire:

* attiva la **Two-Factor Authentication (2FA)** su GitHub
* chiedi di far parte di un team (frontend, backend, etc)
* clona il repository:

## 2. Branching Model

Tutto lo sviluppo avviene tramite branch dedicati.

## Branch principali

| Branch      | Uso                                |
| ----------- | ---------------------------------- |
| `main`      | codice stabile                     |
| `develop`   | integrazione funzionalità complete |
| `feature/*` | nuove feature                      |
| `fix/*`     | bugfix                             |

## Regole generali

* **mai** (**MAI**) lavorare direttamente su `main` o `develop`
* ogni sviluppo deve partire dal branch `develop` e creare un nuovo branch di tipo `feature/*` o `fix/*`:

Esempi:

```
feature/login-page
fix/header-layout
```

## 3. Commit Guidelines

Usiamo commit generati di Copilot

## 4. Issues

Ogni attività deve avere una Issue associata che ti è stata assegnata da un responsabile

## 5. Pull Requests

Tutte le modifiche devono passare tramite **Pull Request**.

### Regole PR

* target branch: **sempre `develop`**
* collega la Issue (es: *Closes #12*)
* descrivi cosa è stato fatto
* aggiungi screenshot se la PR riguarda UI
* richiedi revisione a un reviewer
* la PR deve avere almeno **1 approvazione**

## 6. Review del Codice

Il reviewer deve verificare:

* chiarezza del codice
* aderenza agli standard del progetto
* assenza di errori evidenti
* manutennibilità

Il reviewer può:

* approvare
* richiedere modifiche
* commentare parti specifiche

Il merge avviene solo dopo l'approvazione.

## 7. Best Practice

* mantieni PR piccole e focalizzate
* non includere più feature in un'unica PR
* aggiorna la documentazione quando necessario
* non pushare file di build o credenziali
* controlla che tutto funzioni prima di aprire una PR
* mantieni un comportamento collaborativo e professionale