# Benvenuti su Vigainsider

Grazie per il tuo contributo al progetto!
Per mantenere un flusso di lavoro pulito, stabile e coordinato, **tutti gli sviluppatori devono seguire queste regole operative**.

## 1. Requisiti

Software e strumenti necessari:

* [Git](https://git-scm.com/install/windows)
* [Visual Studio Code](https://code.visualstudio.com/) con le estensioni:
  * Git Graph
  * GitHub Pull Requests
  * Tailwind CSS IntelliSense
* [Docker Desktop](https://www.docker.com/) da avviare quando si vuole sviluppare. Fa partire il server web + PHP + MySQL

Prima di contribuire assicurati di avere Git installato e configurato:

``` bash
git config --global user.name "Il Tuo Nome"
git config --global user.email "tua.email@example.com"
```

Successivamente:

* crea un account [GitHub](https://github.com/)
* attiva la **Two-Factor Authentication (2FA)** su GitHub
* chiedi di far parte di un team (frontend, backend, etc)

## 2. Scarica il codice sorgente: 

Clona il repository
``` bash
git clone https://github.com/VigaInsider/vigainsider.git
```
Posizionati nella directory vigainsider

``` bash 
cd vigainsider
```
Avvia Visual Studio Code
``` bash 
code .
```

Crea una copia del file `.env.develop` e rinominalo in `.env`

## 3. Avvia un container
Aprire un terminale nella directory di sviluppo vigainsider ed eseguire:
```bash
docker-compose up -d --build
```

## 4. Accesso ai servizi

* **PHP/Apache** → [http://localhost:8080](http://localhost:8080)
* **phpMyAdmin** → [http://localhost:8888](http://localhost:8888)
  * user: `vigainsider`, pass: `vigainsider`, DB: `vigainsider_db`
  * root: `root`, pass: `root`, DB: `vigainsider_db`
* **MySQL** → Porta `3306`, root password `root`

## 5. Branching Model

Tutto lo sviluppo avviene tramite branch dedicati.

Ricordarsi di fare regolarmente il fetch dei brench, specialmente prima di iniziare a sviluppare, eliminando i branch non più utilizzati tramite prune

```bash
git fetch --prune
```

### Branch principali

| Branch      | Uso                                |
| ----------- | ---------------------------------- |
| `main`      | codice stabile                     |
| `develop`   | integrazione funzionalità complete |
| `feature/*` | nuove feature                      |
| `fix/*`     | bugfix                             |

### Regole generali

* **mai** (**MAI**) lavorare direttamente su `main` o `develop`
* ogni sviluppo deve partire dal branch `develop` e creare un nuovo branch di tipo `feature/*` o `fix/*`:

Esempi:

```
feature/login-page
fix/header-layout
```

## 6. Commit Guidelines

Usiamo commit generati di Copilot

## 7. Issues

Ogni attività deve avere una Issue associata che ti è stata assegnata da un responsabile

## 8. Pull Requests

Tutte le modifiche devono passare tramite **Pull Request**.

### Regole PR

* target branch: **sempre `develop`**
* collega la Issue (es: *Closes #12*)
* descrivi cosa è stato fatto
* aggiungi screenshot se la PR riguarda UI
* richiedi revisione a un reviewer
* la PR deve avere almeno **1 approvazione**

## 9. Review del Codice

Il reviewer deve verificare:

* chiarezza del codice
* aderenza agli standard del progetto
* assenza di errori evidenti
* manutenibilità

Il reviewer può:

* approvare
* richiedere modifiche
* commentare parti specifiche

Il merge avviene solo dopo l'approvazione.

## 10. Best Practice

* mantieni PR piccole e focalizzate
* non includere più feature in un'unica PR
* aggiorna la documentazione quando necessario
* non pushare file di build o credenziali
* controlla che tutto funzioni prima di aprire una PR
* mantieni un comportamento collaborativo e professionale