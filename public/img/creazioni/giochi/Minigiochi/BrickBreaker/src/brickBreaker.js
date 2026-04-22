// BRICK BREAKER GAME
// obbiettivo: distruggere tutti i "brick" (rettangoli colorati)
// modalità distruzione: pallina
// funzionamento: pallina rimbalza su bordi e su un "cursor" (rettangolo in basso allo schermo che si muove in base alle pressione delle freccie)
//                se tocca un brick, lo distrugge

// variabili importanti: velocita (numero di "pixel" di cui si muove la pallina),
//                       direzione (direzione pallina),
//                       msGioco (ms con cui si muove la pallina (setInteval)),
//                       container (contenitore del gioco),
//                       leftKeys e rightKey (caratteri ascii per il movimento del cursor),
//                       punteggio
//                       viteHTML (elemento html contenente le immagini e n vite, importante per la creazione dei livelli)
//                       putneggioHTML (elemento html contenente punteggio, importante per la creazione dei livelli)
//                       ballHTML (elemento html contenente la palla, importante per la creazione dei livelli)
//                       cursorHTML (elemento html contenente il cursor, importante per la creazione dei livelli)
//                       noPunteggio (boolean, imposta quando non si deve calcolare il punteggio)
//                       deviCopiare (boolean, imposta quando si deve copiare l'html)

// funzioni importanti: controllo (e) riga 118,
//                      controlloContainer() riga 179,
//                      calcolaPunteggio(evt) riga 216,
//                      pausa() riga 296,
//                      vitaPersa() riga 560,
//                      gamePlay() riga 589,
//                      movimentoCursor(e) riga 678;

let bricks, a, indistruttibili;
let leftCursor = "45%";
let leftBall = "calc(50% - 10px)";
let topBall = "70vh";
let color = ["red", "yellow", "blue", "green", "orange", "purple"];
let controlloPunteggio = ["vita", "brick", "brickIN", "vittoria"];
let sommaPunteggio = ["-500", "+50", "+10", "+250"];
let leftKeys = [37, 65]; // 37 = leftArrow | 65 = a
let rightKeys = [39, 68]; // 39 = rightArrow | 68 = d
let pauseKey = 80; // p
let startKey = 32; //spacebar
let msGioco = 10;
let velocita = 0.1;
let velocitaIniziale = velocita;
let ball = document.getElementById("ball");
let cursor = document.getElementById("cursor");
let direzione = 0; // 0 sotto | 1 topRight | 2 bottomRight | 3 bottomLeft | 4 topLeft
let container = document.getElementById("container");
let punteggio = 0;
let pausaGame = false;
let fine = false;
let vite = 3;
let livello1 = false;
let livello2 = false;
let livello3 = false;
let totalEnd = false;
let inizio1 = true;
let inizio2 = true;
let noPunteggio = false;
let deviCopiare = true;
let livello = 1;

// elemento html delle vite
let viteHTML = document.createElement("div");
viteHTML.setAttribute("class", "vite");
let imgVite1 = document.createElement("img");
let imgVite2 = document.createElement("img");
imgVite1.setAttribute("src", "img\\ball.png");
imgVite2.setAttribute("src", "img\\x.png");
let h1Vite = document.createElement("h1");
h1Vite.setAttribute("id", "vite");
viteHTML.appendChild(imgVite1);
viteHTML.appendChild(imgVite2);
viteHTML.appendChild(h1Vite);
// viteHTML =
//   <div class="vite">
//     <img src="img\ball.png" />
//     <img src="img\x.png" />
//     <h1 id="vite"></h1>
//   </div>

// elemento html del punteggio
let punteggioHTMLelement = document.createElement("div");
punteggioHTMLelement.setAttribute("class", "punteggio");
let h1Punteggio = document.createElement("h1");
let spanPunteggio = document.createElement("span");
spanPunteggio.setAttribute("id", "punteggio");
spanPunteggio.innerHTML = "00000";
h1Punteggio.innerHTML = "Punteggio: ";
h1Punteggio.appendChild(spanPunteggio);
punteggioHTMLelement.appendChild(h1Punteggio);
// punteggioHTMLelement =
//   <div class="punteggio">
//     <h1>Punteggio: <span id="punteggio">00000</span></h1>
//   </div>

// elemento html della palla e del cursor
let ballHTML = document.createElement("div");
ballHTML.setAttribute("id", "ball");
let cursorHTML = document.createElement("div");
cursorHTML.setAttribute("id", "cursor");
// ballHTML = <div id="ball"></div>
// cursorHTML = <div id="cursor"></div>

// funzione semplice: quando la pagina viene caricata, tutti i brick del gioco vengono caricati di un colore casuale
let randomColor = () => {
  bricks = document.querySelectorAll(".brick");
  bricks.forEach((element) => {
    element.classList.add(color[Math.floor(Math.random() * color.length)]);
  });
};
// funzione semplice: calcolo distanza
let dist = (ball, element) => {
  return Math.abs(ball - element);
};

// FUNZIONE CONTROLLO HIT BRICK/BRICKIN
// tramite la posizione della pallina (x, y, top, bottom, left, right) e l'aiuto della funzione "dist" va a calcolare se essa è entrata in contatto con uno dei brick
// gli viene passato "e" che sarebbe l'elemento html di uno dei brick distruttibili o non
// ritorna un boolean, rappresenta se sono entrati in contatto o no
let controllo = (e) => {
  let ballXY = ball.getBoundingClientRect();
  let brickXY = e.getBoundingClientRect();

  let colpito = false;
  //hit sotto
  if (
    dist(ballXY.top, brickXY.bottom) <= 3 &&
    ((ballXY.x >= brickXY.left && ballXY.x < brickXY.right) ||
      (ballXY.left > brickXY.left && ballXY.left < brickXY.right) ||
      (ballXY.right > brickXY.left && ballXY.right < brickXY.right))
  ) {
    if (direzione == 1) direzione = 2;
    if (direzione == 4) direzione = 3;

    colpito = true;
  }
  //hit sopra
  if (
    dist(ballXY.bottom, brickXY.top) <= 3 &&
    ((ballXY.x >= brickXY.left && ballXY.x <= brickXY.right) ||
      (ballXY.left > brickXY.left && ballXY.left < brickXY.right) ||
      (ballXY.right > brickXY.left && ballXY.right < brickXY.right))
  ) {
    if (direzione == 2) direzione = 1;
    if (direzione == 3) direzione = 4;
    if (direzione == 0) direzione = 1;

    colpito = true;
  }
  //hit sinistra
  if (
    dist(ballXY.right, brickXY.left) <= 3 &&
    ((ballXY.y <= brickXY.bottom && ballXY.y >= brickXY.top) ||
      (ballXY.top > brickXY.top && ballXY.top < brickXY.bottom) ||
      (ballXY.bottom > brickXY.top && ballXY.bottom < brickXY.bottom))
  ) {
    if (direzione == 1) direzione = 4;
    if (direzione == 2) direzione = 3;

    colpito = true;
  }
  //hit destra
  if (
    dist(ballXY.left, brickXY.right) <= 3 &&
    ((ballXY.y <= brickXY.bottom && ballXY.y >= brickXY.top) ||
      (ballXY.top > brickXY.top && ballXY.top < brickXY.bottom) ||
      (ballXY.bottom > brickXY.top && ballXY.bottom < brickXY.bottom))
  ) {
    if (direzione == 4) direzione = 1;
    if (direzione == 3) direzione = 2;

    colpito = true;
  }

  return colpito;
};

// FUNZIONE CONTROLLO BORDI
// è simile alla funzione per il controllo delle hit dei brick solo che viene applicata ai bordi del container
// cambia l'assegnazione del valore alla variabile "direzione", data dal diverso tipo di rimbalzo
let controlloContainer = () => {
  let containerXY = container.getBoundingClientRect();
  let ballXY = ball.getBoundingClientRect();

  //hit sopra
  if (dist(ballXY.top, containerXY.top) <= 4) {
    if (direzione == 4) direzione = 3;
    if (direzione == 1) direzione = 2;
  }
  //hit destra
  if (dist(ballXY.right, containerXY.right) <= 4) {
    if (direzione == 1) direzione = 4;
    if (direzione == 2) direzione = 3;
  }
  //hit sinistra
  if (dist(ballXY.left, containerXY.left) <= 4) {
    if (direzione == 4) direzione = 1;
    if (direzione == 3) direzione = 2;
  }
};

// funzione semplice: scrive punteggio in "<span id="punteggio"></span>" sul formato 'NNNNN'
let scriviPunteggio = () => {
  let punteggioHTML = document.getElementById("punteggio");

  if (punteggio == 0) punteggioHTML.innerHTML = "00000";
  else if (punteggio < 100) punteggioHTML.innerHTML = "000" + punteggio;
  else if (punteggio > 100 && punteggio < 1000) punteggioHTML.innerHTML = "00" + punteggio;
  else if (punteggio > 1000 && punteggio < 10000) punteggioHTML.innerHTML = "0" + punteggio;
  else if (punteggio > 10000) punteggioHTML.innerHTML = punteggio;
};
// FUNZIONE CALCOLO PUNTEGGIO
// viene passata una stringa (evt) "vita" || "brick" || "brickIN" || "vittoria"
// "vita" = vita persa => -500 punti
// "brick" = brick distrutto => +50 punti
// "brickIN" = brick indistruttibile colpito => +10 punti
// "vittoria" = livello superato => +250 punti
// in caso non viene passato nessun argomento evt viene impostato su null e viene semplicemente ritornato punteggio
let calcolaPunteggio = (evt = null) => {
  if (noPunteggio) return;

  // ritorna somma del punteggio in base alla stringa e lo scrive oppure ritorna il punteggio se non viene passata un argomento
  for (let i = 0; i < controlloPunteggio.length; i++)
    if (controlloPunteggio[i] == evt) {
      punteggio = eval(punteggio + sommaPunteggio[i]);
      console.log(evt + " " + sommaPunteggio[i]);
    }
  if (punteggio < 0) punteggio = 0;

  scriviPunteggio();
  return punteggio;
};
// funzione semplice: fa "ripartire" il programma
let fromTheStart = () => {
  window.location.reload();
};

// FUNZIONI POPUP
// fa comparire un "pop up" che segnala la pausa e anche un modo per far riprendere o terminare il gioco
let popUpPausa = () => {
  let popup = document.createElement("div");
  let h1 = document.createElement("h1");
  let h2 = document.createElement("h1");
  let h3 = document.createElement("h1");
  let containerButton = document.createElement("div");
  containerButton.setAttribute("class", "flex-row buttonsEnd");
  let button2 = document.createElement("button");
  let button1 = document.createElement("button");
  popup.setAttribute("class", "popup");
  popup.setAttribute("id", "popup");
  h1.innerHTML = "Pausa!";
  popup.appendChild(h1);
  h2.innerHTML = "PREMI 'SPACEBAR' PER RIPRENDERE";
  popup.appendChild(h2);
  h3.innerHTML = "Punteggio: " + punteggio;
  popup.appendChild(h3);
  button1.setAttribute("onclick", "fromTheStart()");
  button1.innerHTML = "Rinizia";
  button2.setAttribute("onclick", "fineGioco()");
  button2.innerHTML = "Termina";
  containerButton.appendChild(button1);
  containerButton.appendChild(button2);
  popup.appendChild(containerButton);

  document.body.appendChild(popup);
};
// POPUP VITAPERSA
let popUpVitaPersa = () => {
  let popup = document.createElement("div");
  let h1 = document.createElement("h1");
  let h1_1 = document.createElement("h1");
  let h2 = document.createElement("h1");
  let h3 = document.createElement("h1");
  let button = document.createElement("button");
  let containerButton = document.createElement("div");
  containerButton.setAttribute("class", "flex-row buttonsEnd");
  popup.setAttribute("class", "popup");
  popup.setAttribute("id", "popup");
  h1.innerHTML = "Vita persa!";
  popup.appendChild(h1);
  h1_1.innerHTML = "(Se stai rifacendo il livello non verrà modificato il numero delle tue vite)";
  popup.appendChild(h1_1);
  h2.innerHTML = "PREMI 'SPACEBAR' PER RIPRENDERE";
  popup.appendChild(h2);
  h3.innerHTML = "Punteggio: " + punteggio;
  popup.appendChild(h3);
  button.setAttribute("onclick", "fineGioco()");
  button.innerHTML = "Termina";
  containerButton.appendChild(button);
  popup.appendChild(containerButton);

  document.body.appendChild(popup);
};

// FUNZIONE PAUSA
// utilizza clearInterval() per stoppare il movimento della palla
// impossibile muovere il cursor mentre c'è pausa
let pausa = () => {
  clearInterval(a);
  pausaGame = true; // boolean segnala pausa attiva

  leftBall = ball.style.left; //prende posizione di palla e cursor in modo da non ripristinare la posizione dopo la ripresa della sessione
  topBall = ball.style.top;

  leftCursor = cursor.style.marginleft;

  popUpPausa();

  document.onkeydown = startGame; //aspetta pressione space per riniziare
};

// funzione semplice: fine del gioco, schermo nero con scritto il punteggio
let fineGioco = () => {
  let popup = document.createElement("div"); //creazione base popUp
  popup.setAttribute("class", "popup black");
  popup.setAttribute("id", "popup");
  let h1 = document.createElement("h1"); //titoli
  h1.innerHTML = "FINE GIOCO!";
  let h2 = document.createElement("h1");
  h2.innerHTML = "Punteggio: " + punteggio;
  popup.appendChild(h1);
  popup.appendChild(h2);
  totalEnd = true; //segnala fine totale del gioco

  document.getElementById("popup").parentElement.removeChild(document.getElementById("popup")); //eliminazione popUp di fine livello
  document.body.appendChild(popup); //inserimento popUP fine gioco
};

//funzione semplice: tramite una copia ricrea il livello appena giocato, con punteggio e vite uguali all'inizio
let sameLevel = () => {
  document.body.innerHTML = copia; //imposta il livello sull'ultimo giocato (html)
  fine = false; //reset variabili
  direzione = 0;
  leftCursor = "45%";
  leftBall = "calc(50% - 10px)";
  topBall = "70vh";
  velocita = velocitaIniziale;

  document.onkeydown = startGame;
  scriviPunteggio();

  noPunteggio = true; // boolean non si deve calcolare punteggio e togliere vite
  randomColor();
};

// FUNZIONE NUOVO LIVELLO
// 2 e 3 livello sono sempre uguali, mentre i livelli 4+ sono generati casualmente
let nuovoLivello = () => {
  deviCopiare = true;
  let row1 = document.createElement("div");
  let row2 = document.createElement("div");
  let row3 = document.createElement("div");
  let row4 = document.createElement("div");
  let row5 = document.createElement("div");
  let rows = [row1, row2, row3, row4, row5];

  for (let i = 0; i < 5; i++) rows[i].setAttribute("class", "row m-top" + (i + 1));

  if (livello1 && !livello2 && !livello3) {
    // livello 2
    for (let i = 0; i < 10; i++) {
      let brick = document.createElement("div");
      brick.setAttribute("class", "brick");
      brick.setAttribute("style", "left: " + 10 * i + "%");
      rows[0].appendChild(brick);
    }
    for (let i = 0; i < 10; i++) {
      let brick = document.createElement("div");
      brick.setAttribute("class", "brick");
      brick.setAttribute("style", "left: " + 10 * i + "%");
      rows[1].appendChild(brick);
    }
    for (let i = 0; i < 10; i++) {
      let brick = document.createElement("div");
      brick.setAttribute("class", "brick");
      brick.setAttribute("style", "left: " + 10 * i + "%");
      // brick.setAttribute("style", "left: " + 80 + "%");
      rows[3].appendChild(brick);
    }
    let indistruttibile = document.createElement("div");
    indistruttibile.setAttribute("class", "indistruttibile");
    indistruttibile.setAttribute("style", "left: 30%; width: 40%");
    rows[2].appendChild(indistruttibile);
  }
  if (livello2 && livello1 && !livello3) {
    // livello 3
    for (let i = 0; i < 10; i++) {
      let brick = document.createElement("div");
      brick.setAttribute("class", "brick");
      brick.setAttribute("style", "left: " + 10 * i + "%");
      rows[0].appendChild(brick);
    }
    for (let i = 0; i < 10; i++) {
      let brick = document.createElement("div");
      brick.setAttribute("class", "brick");
      brick.setAttribute("style", "left: " + 10 * i + "%");
      rows[2].appendChild(brick);
    }
    for (let i = 0; i < 10; i++) {
      let brick = document.createElement("div");
      brick.setAttribute("class", "brick");
      brick.setAttribute("style", "left: " + 10 * i + "%");
      // brick.setAttribute("style", "left: " + 80 + "%");
      rows[4].appendChild(brick);
    }
    let indistruttibile1 = document.createElement("div");
    indistruttibile1.setAttribute("class", "indistruttibile");
    indistruttibile1.setAttribute("style", "left: 0; width: 30%");
    rows[1].appendChild(indistruttibile1);
    let indistruttibile2 = document.createElement("div");
    indistruttibile2.setAttribute("class", "indistruttibile");
    indistruttibile2.setAttribute("style", "right: 0; width: 30%");
    rows[3].appendChild(indistruttibile2);
  }
  if (livello3 && livello2 && livello1) {
    // livello 4+
    let random = Math.floor(Math.random() * 10) + 4;
    for (let i = 0; i < random; i++) {
      let brick = document.createElement("div");
      brick.setAttribute("class", "brick");
      brick.setAttribute("style", "left: " + (100 / random) * i + "%; width: " + 100 / random + "%");
      rows[0].appendChild(brick);
    }
    random = Math.floor(Math.random() * 10) + 4;
    for (let i = 0; i < random; i++) {
      let brick = document.createElement("div");
      brick.setAttribute("class", "brick");
      brick.setAttribute("style", "left: " + (100 / random) * i + "%; width: " + 100 / random + "%");
      rows[2].appendChild(brick);
    }
    random = Math.floor(Math.random() * 10) + 4;
    for (let i = 0; i < random; i++) {
      let brick = document.createElement("div");
      brick.setAttribute("class", "brick");
      brick.setAttribute("style", "left: " + (100 / random) * i + "%; width: " + 100 / random + "%");
      // brick.setAttribute("style", "left: " + 80 + "%");
      rows[4].appendChild(brick);
    }
    random = Math.floor(Math.random() * 20);
    let indistruttibile1 = document.createElement("div");
    indistruttibile1.setAttribute("class", "indistruttibile");
    indistruttibile1.setAttribute("style", "left: " + random + "%; width: 30%");
    rows[1].appendChild(indistruttibile1);
    random = Math.floor(Math.random() * 20);
    let indistruttibile2 = document.createElement("div");
    indistruttibile2.setAttribute("class", "indistruttibile");
    indistruttibile2.setAttribute("style", "right: " + random + "%; width: 30%");
    rows[3].appendChild(indistruttibile2);
  }

  container.innerHTML = "";
  container.appendChild(viteHTML);
  container.appendChild(punteggioHTMLelement);
  container.appendChild(row1);
  container.appendChild(row2);
  container.appendChild(row3);
  container.appendChild(row4);
  container.appendChild(row5);
  container.appendChild(ballHTML);
  container.appendChild(cursorHTML);
  scriviPunteggio();
  document.getElementById("vite").innerHTML = vite;
  document.getElementById("popup").parentElement.removeChild(document.getElementById("popup"));
  direzione = 0; // reset variabili
  fine = false;
  velocita = velocitaIniziale;
  leftCursor = "45%";
  leftBall = "calc(50% - 10px)";
  topBall = "70vh";
  ball.style.left = leftBall;
  ball.style.top = topBall;
  cursor.style.marginLeft = leftCursor;

  let popup = document.createElement("div");
  popup.setAttribute("class", "popup");
  popup.setAttribute("id", "popup");
  let h1 = document.createElement("h1");
  h1.innerHTML = "Brick Breaker!";
  let h2 = document.createElement("h1");
  h2.innerHTML = "Livello " + livello;
  let h3 = document.createElement("h1");
  h3.innerHTML = "PREMI 'SPACEBAR' PER INIZIARE";
  popup.appendChild(h1);
  popup.appendChild(h2);
  popup.appendChild(h3);
  document.body.appendChild(popup);

  randomColor();
  document.onkeydown = startGame;
};

// FUNZIONE FINE LIVELLO
// in caso di vittoria display congratulazioni + bottoni per ripetere il livello con azzeramento del punteggio o passare al prossimo o terminare il gioco
// in caso di partita persa display "oh no" o smth + bottone per terminare il gioco o rifare il livello
let menuFine = (vittoria) => {
  let popup = document.createElement("div"); //base popUp
  popup.setAttribute("class", "popup");
  popup.setAttribute("id", "popup");
  let containerButton = document.createElement("div"); //div che terrà i bottoni in row
  containerButton.setAttribute("class", "flex-row buttonsEnd");
  if (vittoria) {
    calcolaPunteggio("vittoria");
    let h1 = document.createElement("h1");
    h1.innerHTML = "VITTORIA!";
    let h2 = document.createElement("h1");
    h2.innerHTML = "Ora puoi scegliere se passare al prossimo livello, riprovare questo o terminare la sessione";
    let button1 = document.createElement("button");
    button1.setAttribute("onclick", "nuovoLivello()");
    button1.innerHTML = "Prossimo";
    let button2 = document.createElement("button");
    button2.innerHTML = "Gioca di nuovo";
    button2.setAttribute("onclick", "sameLevel()");
    let button3 = document.createElement("button");
    button3.innerHTML = "Rinizia";
    button3.setAttribute("onclick", "fromTheStart()");
    let button4 = document.createElement("button");
    button4.innerHTML = "Termina";
    button4.setAttribute("onclick", "fineGioco()");

    popup.appendChild(h1);
    popup.appendChild(h2);
    popup.appendChild(containerButton);
    containerButton.appendChild(button1);
    containerButton.appendChild(button2);
    containerButton.appendChild(button3);
    containerButton.appendChild(button4);

    if (!noPunteggio) {
      // vittoria mentre si rifà un livello "non conta"
      if (!livello1 && !livello2 && !livello3) livello1 = true;
      else if (livello2) livello3 = true;
      else if (livello1) livello2 = true;
      livello++;
    }
  } else {
    let h1 = document.createElement("h1");
    h1.innerHTML = "HAI PERSO!";
    let h2 = document.createElement("h1");
    h2.innerHTML = "Ora puoi scegliere se riprovare il livello o terminare la sessione";
    let button1 = document.createElement("button");
    button1.innerHTML = "Rinizia";
    button1.setAttribute("onclick", "fromTheStart()");
    let button2 = document.createElement("button");
    button2.innerHTML = "Termina";
    button2.setAttribute("onclick", "fineGioco()");

    popup.appendChild(h1);
    popup.appendChild(h2);
    popup.appendChild(containerButton);
    containerButton.appendChild(button1);
    containerButton.appendChild(button2);
  }

  pausaGame = false;
  noPunteggio = false;
  document.body.appendChild(popup);
};

// FUNZIONE VITE
// 3 vite per tutti i livelli
// si perde una vita quando la pallina passa sotto il cursor
// perdere una vita fa perdere 500 punti
let vitaPersa = () => {
  if (!noPunteggio) {
    // quando noPunteggio è true non si tolgono vite
    calcolaPunteggio("vita");
    vite--;
    document.getElementById("vite").innerHTML = vite;
    clearInterval(a);
    if (vite == 0) {
      //fine gioco in caso di vite terminate
      menuFine(false);
      return;
    }
  }

  leftCursor = "45%"; //reset variabili
  leftBall = "calc(50% - 10px)";
  topBall = "70vh";
  direzione = 0;
  velocita = velocitaIniziale;

  popUpVitaPersa();
  pausaGame = true;
  document.onkeydown = startGame;
};

// FUNZIONE GIOCO
// tramite setInteval() muove la pallina "teletrasportandola" di poco alla volta, ms di velocità regolabili tramite variabile "msGioco"
// essendo l'elemento html della pallina con "position: absolute" si sposta modificando i valori di ("left"%-10px) e "top"vh
// ogni volta che la pallina viene "teletrasportata" viene fatto un controllo su tutti i brick e i bordi
let gamePlay = () => {
  if (deviCopiare) {
    //copia quando inizia il livello in caso voglia rigiocare il livello
    copia = document.body.innerHTML;
    deviCopiare = false;
  }
  ball = document.getElementById("ball");
  cursor = document.getElementById("cursor");
  container = document.getElementById("container");
  ball.style.left = leftBall;
  ball.style.top = topBall;
  document.getElementById("vite").innerHTML = vite;

  cursor.style.marginLeft = leftCursor;

  a = setInterval(() => {
    let top = parseFloat(ball.style.top.toString().replace("vh", "")); //es. "70vh" => 70
    let left = parseFloat(ball.style.left.toString().replace("calc(", "").replace(" - 5vw)")); //es. "calc(50% - 10px)" => 50
    bricks = document.querySelectorAll(".brick");
    indistruttibili = document.querySelectorAll(".indistruttibile");

    //movimento ball
    switch (direzione) {
      case 0:
        //sotto
        top += velocita;
        break;
      case 1:
        //topRight
        top -= velocita;
        left += velocita;
        break;
      case 2:
        //bottomRight
        top += velocita;
        left += velocita;
        break;
      case 3:
        //bottomLeft
        top += velocita;
        left -= velocita;
        break;
      case 4:
        //topLeft
        top -= velocita;
        left -= velocita;
        break;
    }
    //aggiornamento movimento
    ball.style.left = "calc(" + left + "% - 10px)";
    ball.style.top = top + "vh";
    //CONTROLLI
    //controllo cursor
    controllo(cursor);
    if (ball.getBoundingClientRect().top > cursor.getBoundingClientRect().top + 10) {
      //persa
      fine = true;
      vitaPersa();
      clearInterval(a);
    }
    //controllo bricks
    bricks.forEach((element) => {
      if (controllo(element)) {
        element.parentElement.removeChild(element); // rimozione brick
        velocita += 0.01; //aumento velocità
        calcolaPunteggio("brick");
        if (document.querySelectorAll(".brick").length == 0) {
          //vinto
          fine = true;
          menuFine(true);
          clearInterval(a);
        }
      }
    });
    indistruttibili.forEach((element) => {
      if (controllo(element)) {
        calcolaPunteggio("brickIN");
        velocita += 0.001;
      }
    });
    //controllo container
    controlloContainer();
  }, msGioco);
};

// FUNZIONE MOVIMENTO CURSOR
// variabile "movimento" decide di quanto si muove il cursor
// cursor elemento html con "position: absolute", viene spostato tramite la modifica del valore "left"%
// controllo anche se viene premuta "p" per pausa
let movimentoCursor = (e) => {
  if (pausaGame || fine) return;

  let element = e.keyCode;
  let left = parseFloat(cursor.style.marginLeft.toString().replace("%", ""));
  let movimento = 1.5;

  if (leftKeys.includes(element)) {
    //left
    left -= movimento;
    if (left < 0) left = 0;
  }
  if (rightKeys.includes(element)) {
    //right
    left += movimento;
    if (left > 90) left = 90;
  }
  if (element == pauseKey && !fine) pausa();

  cursor.style.marginLeft = left + "%";
};

// funzione semplice: inizio funzione gamePlay() alla pressione del carattere "spazio"
let startGame = (e) => {
  if (totalEnd) return; // se è finito non si può muovere

  let element = e.keyCode;

  if (element == startKey) {
    if (inizio1 || inizio2) {
      inizio1 = false; //inizio del gioco doppio "pop up"
      document.getElementById("popup").parentElement.removeChild(document.getElementById("popup"));
      let popup = document.createElement("div");
      popup.setAttribute("class", "popup inizio");
      popup.setAttribute("id", "popup");
      let h0 = document.createElement("h1");
      h0.innerHTML = "Brick Breaker!";
      let h1 = document.createElement("h1");
      h1.innerHTML = "Se dovessi premere il tasto 'Gioca di nuovo' il tuo punteggio e le tue vite non saranno modificate";
      let h2 = document.createElement("h1");
      h2.innerHTML = "PREMI 'SPACEBAR' PER INIZIARE";

      popup.appendChild(h0);
      popup.appendChild(h1);
      popup.appendChild(h2);

      document.body.appendChild(popup);

      inizio2 = false;
    } else {
      //inizio gioco
      gamePlay();
      document.onkeydown = movimentoCursor;
      document.getElementById("popup").parentElement.removeChild(document.getElementById("popup"));
      pausaGame = false;
      fine = false;
    }
  }
};

document.onkeydown = startGame; //space per start game
randomColor();

// Marzo 2022 Simone Mazza (4H ISS Vigano a.s. 2021/2022)
