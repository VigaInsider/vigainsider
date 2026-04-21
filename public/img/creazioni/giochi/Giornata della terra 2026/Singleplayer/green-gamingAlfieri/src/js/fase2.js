// PASSO 1: Lista di tutti i rifiuti con la loro categoria
const listaRifiuti = [
    { img: 'assets/media/img/fase2/rifiuti/bicchiereEbottiglia.webp', tipo: 'vetro' },
    { img: 'assets/media/img/fase2/rifiuti/bottiglie.webp', tipo: 'plastica' },
    { img: 'assets/media/img/fase2/rifiuti/bucciaBanana.png', tipo: 'umido' },
    { img: 'assets/media/img/fase2/rifiuti/torsoloMela.webp', tipo: 'umido' },
    { img: 'assets/media/img/fase2/rifiuti/giornale.png', tipo: 'carta' },
    { img: 'assets/media/img/fase2/rifiuti/scatolaCartone.png', tipo: 'carta' },
    { img: 'assets/media/img/fase2/rifiuti/lattina.png', tipo: 'alluminio' },
    { img: 'assets/media/img/fase2/rifiuti/scatolaTonno.webp', tipo: 'alluminio' },
    { img: 'assets/media/img/fase2/rifiuti/sacchettoPlastica.png', tipo: 'plastica' },
    { img: 'assets/media/img/fase2/rifiuti/marmellata.png', tipo: 'vetro' },
    { img: 'assets/media/img/fase2/rifiuti/mozziconiSigaretta.png', tipo: 'indifferenziata' },
    { img: 'assets/media/img/fase2/rifiuti/pannolino.png', tipo: 'indifferenziata' }
];

let rifiutiTotali = 0;
const counter = document.getElementById('counter');
const scoreDisplay = document.getElementById('score');

// PASSO 2:Funzione per creare un rifiuto casuale sul bancone
function generaRifiuto() {
    const indiceRandom = Math.floor(Math.random() * listaRifiuti.length);
    const rifiutoScelto = listaRifiuti[indiceRandom];

    const imgElement = document.createElement('img');
    imgElement.src = rifiutoScelto.img;
    imgElement.classList.add('trash');
    imgElement.dataset.tipo = rifiutoScelto.tipo;

    counter.appendChild(imgElement);
    attivaDragAndDrop(imgElement);
}
// Avviamo la prima generazione
window.onload = () => {
    generaRifiuto();
    // Qui faremo partire anche il timer in futuro
};


//PASSO 3: Funzione per rendere un elemento trascinabile
function attivaDragAndDrop(elemento) {
    let staTrascinando = false;

    elemento.addEventListener('mousedown', (e) => {
        staTrascinando = true;

        elemento.style.mixBlendMode = "normal";

        // 1. IMPORTANTE: Spostiamo l'elemento dal "counter" al "game-container"
        // Questo evita che l'oggetto scompaia per conflitti di posizionamento
        const container = document.getElementById('game-container');
        if (elemento.parentElement.id === 'counter') {
            container.appendChild(elemento);
        }

        elemento.style.position = 'absolute';
        elemento.style.zIndex = 1000;
        elemento.style.cursor = 'grabbing';

        // Chiamiamo subito la funzione di movimento per posizionarlo sotto il mouse
        muoviOggetto(e);

        e.preventDefault();
    });

    function muoviOggetto(e) {
        if (!staTrascinando) return;

        const container = document.getElementById('game-container');
        const rect = container.getBoundingClientRect();

        // Calcolo posizione
        let x = e.clientX - rect.left - (elemento.offsetWidth / 2);
        let y = e.clientY - rect.top - (elemento.offsetHeight / 2);

        // Applichiamo le coordinate e resettiamo gli stili del bancone
        elemento.style.left = x + 'px';
        elemento.style.top = y + 'px';
        elemento.style.bottom = 'auto';
        elemento.style.transform = 'none';
    }

    document.addEventListener('mousemove', (e) => {
        if (staTrascinando) {
            muoviOggetto(e);
            evidenziaBidoneSotto(elemento);
        }
    });

    function evidenziaBidoneSotto(rifiuto) {
        const bidoni = document.querySelectorAll('.bin');

        bidoni.forEach(bidone => {
            const rectB = bidone.getBoundingClientRect();
            const rectR = rifiuto.getBoundingClientRect();

            const sovrapposti = !(rectR.right < rectB.left ||
                                rectR.left > rectB.right ||
                                rectR.bottom < rectB.top ||
                                rectR.top > rectB.bottom);

            if (sovrapposti) {
                bidone.classList.add('highlight');
            } else {
                bidone.classList.remove('highlight');
            }
        });
    }



    document.addEventListener('mouseup', () => {
        if (staTrascinando) {
            staTrascinando = false;
            elemento.style.cursor = 'grab';

            // Ora puoi chiamare la funzione del Punto 4
            controllaCollisione(elemento);
        }
    });
}


//PUNTO 4: Funzione per controllare se il rifiuto è stato depositato correttamente
function controllaCollisione(rifiuto) {
    const bidoni = document.querySelectorAll('.bin');
    let depositato = false;

    bidoni.forEach(bidone => {
        const rectB = bidone.getBoundingClientRect();
        const rectR = rifiuto.getBoundingClientRect();

        const sovrapposti = !(rectR.right < rectB.left ||
            rectR.left > rectB.right ||
            rectR.bottom < rectB.top ||
            rectR.top > rectB.bottom);

        if (sovrapposti) {
            depositato = true;

            // PORTIAMO IL BIDONE IN PRIMO PIANO
            bidone.style.zIndex = "2000";

            rifiutiTotali++;
            if (rifiuto.dataset.tipo === bidone.dataset.type) {
                // CORRETTO
                punteggio += 1;
                bidone.classList.add('glow-success');
                bidone.style.transform = "scale(1.1)";

                setTimeout(() => {
                    bidone.classList.remove('glow-success');
                    bidone.style.transform = "scale(1)";
                    bidone.style.zIndex = "1"; // Ritorna al suo posto dopo l'effetto
                }, 400);
            } else {
                // SBAGLIATO
                punteggio = punteggio;
                bidone.classList.add('glow-error');

                setTimeout(() => {
                    bidone.classList.remove('glow-error');
                    bidone.style.zIndex = "1"; // Ritorna al suo posto dopo l'effetto
                }, 400);
            }
            if (rifiutiTotali >= localStorage.getItem('punteggioFase1')) {
                mostraFineGioco();
            }
            document.getElementById('score').innerText = punteggio;
            rifiuto.remove();
            setTimeout(generaRifiuto, 500);
        }
    });

    if (!depositato) {
        riposizionaSulBancone(rifiuto);
    }
}

// Usiamo nomi diversi per non confondere il browser
let timerIntervallo;
let tempoRimanente;

function avviaTimer(secondiIniziali) {
    const minuti = document.getElementById('minuti');
    const secondi = document.getElementById('secondi');

    // Inizializziamo la variabile globale con il valore ricevuto
    tempoRimanente = secondiIniziali;
    minuti.innerText = String(Math.floor(tempoRimanente / 60)).padStart(2, '0');
    secondi.innerText = String(tempoRimanente % 60).padStart(2, '0');

    // Puliamo timer precedenti
    clearInterval(timerIntervallo);

    timerIntervallo = setInterval(() => {
        tempoRimanente--; // Sottraiamo un secondo alla variabile globale
        minuti.innerText = String(Math.floor(tempoRimanente / 60)).padStart(2, '0');
        secondi.innerText = String(tempoRimanente % 60).padStart(2, '0');

        if (tempoRimanente <= 0) {
            clearInterval(timerIntervallo);
            tempoRimanente = 0;
            minuti.innerText = "00";
            secondi.innerText = "00";
            mostraFineGioco();//LISA E' COMPITO TUO!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1
        }
    }, 1000);
}

window.onload = () => {
    punteggio = 0;
    scoreDisplay.innerText = punteggio;


    // Recuperiamo il valore dal localStorage (se vuoto mettiamo 10 come base)
    let puntiSalvati = localStorage.getItem('punteggioFase1');
    let tempoDaImpostare = puntiSalvati * 5;

    generaRifiuto();

    // Facciamo partire il timer con il valore calcolato
    avviaTimer(tempoDaImpostare);
};

function riposizionaSulBancone(rifiuto) {
    const counter = document.getElementById('counter');
    counter.appendChild(rifiuto);

    // Ripristiniamo l'effetto per ignorare lo sfondo nero sul bancone marrone
    rifiuto.style.mixBlendMode = "screen";

    // Resettiamo le posizioni per rimetterlo al centro del bancone
    rifiuto.style.position = 'relative';
    rifiuto.style.left = "auto";
    rifiuto.style.top = "auto";
    rifiuto.style.bottom = "auto";
    rifiuto.style.transform = "none";
}

function mostraFineGioco() {
    // Blocca la generazione di nuovi rifiuti
    clearInterval(timerIntervallo);
    // Salva il punteggio nel localStorage
    localStorage.setItem('punteggioFase2', punteggio);
    const username = localStorage.getItem('username') || 'Anonimo';
    const score1 = parseInt(localStorage.getItem('punteggioFase1')) || 0;
    const score2 = parseInt(localStorage.getItem('punteggioFase2')) || 0;
    const scoreT = 10_000 * ((score1 / MAX_SCORE) + (score2 / MAX_SCORE)) / 2;
    const data_partita = new Date().toISOString().split('T')[0]; // Formato YYYY-MM-DD
    fetch(`${SERVER_URL}/php/save_score.php`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            nome: username,
            score1: score1,
            score2: score2,
            scoreT: scoreT,
            data_partita: data_partita
        })
    })
    .then(response => response.text())
    .then(result => {
        console.log("Punteggio salvato con successo:", result);
        window.location = "?pagina=end";
    })
    .catch(error => {
        console.error("Errore nella richiesta:", error);
        window.location = "?pagina=end";
    });
}