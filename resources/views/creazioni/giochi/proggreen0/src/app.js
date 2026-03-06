let timer = document.getElementById("timer");
let myInterval;
let objDiv = document.getElementById("object");
let score = 0;
let objAttivo = '';
let objects = ['oggetto_carta_1.jpg', 'oggetto_umido_1.jpg', 'oggetto_plastica_1.jpg', 'oggetto_vetro_1.jpg'];
let tipi = ['carta', 'umido', 'plastica', 'vetro'];

function comincia() {
    let elem = document.getElementById("messaggio_iniziale");
    elem.style.display = "none";

    score = 0;
    document.getElementById("score").innerHTML = "Punteggio: " + score;

    myInterval = setInterval(diminuisci_timer, 1000); 
    
    mostraNuovoOggetto(); 
}

function diminuisci_timer() {
    let tempo = parseInt(timer.innerHTML);
    if (tempo == 1) {
        clearInterval(myInterval); 
        alert("Tempo scaduto! Punteggio finale: " + score);
        controllaRecord();
    }
    timer.innerHTML = tempo - 1;
}

function mostraNuovoOggetto() {
    let num = Math.floor(Math.random() * 4);
    let obj = objects[num];
    objAttivo = tipi[num];

    let immagine = document.createElement('img');
    immagine.src = obj;
    immagine.alt = 'Oggetto da riciclare';
    immagine.style.width = '100%';
    immagine.style.height = '100%';

    objDiv.innerHTML = '';
    objDiv.appendChild(immagine);
}

function controllaRisposta(scelta) {
    if (scelta == objAttivo) {
        score = score + 5;
    } else {
        score = score - 2;
    }

    document.getElementById("score").innerHTML = "Punteggio: " + score;

    mostraNuovoOggetto();
}

function controllaRecord() {
    if (score > record) {
        record = score; 
        document.getElementById("record").innerHTML = "Record: " + record;
    }
}