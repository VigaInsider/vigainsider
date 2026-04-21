let interval;
let timerRunning = false;
let seconds = 45;
let punteggioAttuale = 0;
let isPaused = true;
const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
let gameOverActive = false; // Stato che indica se il gameover è attivo

// Se la classifica esiste, la carica
const leaderboardList = document.getElementById('leaderboard');
leaderboard.forEach(score => {
    const li = document.createElement('li');
    li.textContent = `${score.name}: ${score.score}`;
    leaderboardList.appendChild(li);
});

const timerDisplay = document.getElementById("timer");
const pauseMessage = document.getElementById("pauseMessage");
const rulesSection = document.getElementById("rulesSection");
const gameOverSection = document.getElementById("gameOver");
const finalScoreDisplay = document.getElementById("finalScore");
const playerNameInput = document.getElementById("playerName");
const saveScoreButton = document.getElementById("saveScoreButton");

// Funzione per aggiornare il punteggio
function updatePunteggio() {
    document.getElementById("punteggio").textContent = 'Punteggio: ' + punteggioAttuale;
}

// Funzione per far comparire i rifiuti
function farComparireRifiuto() {
    let rifiuto = document.createElement('img');
    switch (Math.floor(Math.random() * 5)) {
        case 1:
            rifiuto.src = 'cartaccia-fotor-bg-remover-2025040213232.png';
            rifiuto.dataset.tipo = 'Carta';
            break;
        case 2:
            rifiuto.src = '769066081_img-fotor-bg-remover-202504021382.png';
            rifiuto.dataset.tipo = 'Plastica';
            break;
        case 3:
            rifiuto.src = 'benefici-buccia-di-banana-1024x683-fotor-bg-remover-20250402131019.png';
            rifiuto.dataset.tipo = 'Umido';
            break;
        default:
            rifiuto.src = 'artbreeder-image-2025-04-02T10_56_10.942Z-fotor-bg-remover-2025040212577.png';
            rifiuto.dataset.tipo = 'Vetro';
            break;
    }

    rifiuto.style.position = 'absolute';
    rifiuto.style.width = '50px';
    rifiuto.style.height = '50px';
    rifiuto.style.top = Math.random() * window.innerHeight + 'px';
    rifiuto.style.left = Math.random() * window.innerWidth + 'px';
    rifiuto.className = "draggable";

    document.body.appendChild(rifiuto);
    abilitaTrascinamento(rifiuto);
}

// Funzione per abilitare il trascinamento
function abilitaTrascinamento(img) {
    let offsetX, offsetY;

    img.addEventListener('dragstart', function (e) {
        offsetX = e.clientX - img.getBoundingClientRect().left;
        offsetY = e.clientY - img.getBoundingClientRect().top;
    });

    img.addEventListener('drag', function (e) {
        if (e.clientX === 0 && e.clientY === 0) return;
        img.style.left = (e.clientX - offsetX) + 'px';
        img.style.top = (e.clientY - offsetY) + 'px';
    });

    img.addEventListener('dragend', function () {
        punteggio(img); // Verifica se il rifiuto è nel cestino giusto
    });
}

// Funzione per calcolare il punteggio
function punteggio(rifiuto) {
    const tipo = rifiuto.dataset.tipo;
    const cestino = document.getElementById('cestino' + tipo.charAt(0).toUpperCase() + tipo.slice(1));

    // Se non esiste il cestino corretto, esci dalla funzione
    if (!cestino) return;

    // Calcolo della posizione del rifiuto e del cestino
    const rifiutoBox = rifiuto.getBoundingClientRect();
    const cestinoBox = cestino.getBoundingClientRect();

    // Verifica se il rifiuto si sovrappone con il cestino
    if (rifiutoBox.left < cestinoBox.right &&
        rifiutoBox.right > cestinoBox.left &&
        rifiutoBox.top < cestinoBox.bottom &&
        rifiutoBox.bottom > cestinoBox.top) {

        // Se la collisione avviene e il tipo è corretto, incremento il punteggio
        if (rifiuto.dataset.tipo === tipo) {
            punteggioAttuale++;
            updatePunteggio();
            rifiuto.remove();
        }
    }
}

// Funzione per fermare e riprendere il gioco
function togglePause() {
    if (isPaused && !gameOverActive) {
        interval = setInterval(farComparireRifiuto, 500); // Riprende il gioco
        isPaused = false;
        pauseMessage.style.display = "none";
        rulesSection.style.display = "none"; // Nascondi le regole
        startTimer(); // Avvia il timer
    } else if (!gameOverActive) {
        clearInterval(interval); // Ferma il gioco
        isPaused = true;
        pauseMessage.style.display = "block"; // Mostra il messaggio di pausa
        rulesSection.style.display = "block"; // Mostra le regole
    }
}

// Funzione per gestire la pressione di "ESC"
function handleEscapeKey(event) {
    if (event.key === "Escape" && !gameOverActive) {
        togglePause(); // Toggle tra pausa e regole
    }
}

// Funzione per il game over
function gameOver() {
    clearInterval(interval);
    document.getElementById('finalScore').textContent = `Punteggio finale: ${punteggioAttuale}`;
    gameOverSection.style.display = 'block';
    gameOverActive = true; // Indica che il gameover è attivo

    // Rimuovi il listener per "ESC" quando il gameover è attivo
    document.removeEventListener("keydown", handleEscapeKey);
}

// Funzione per salvare il punteggio
saveScoreButton.addEventListener('click', () => {
    const playerName = playerNameInput.value.trim();
    if (playerName && !leaderboard.some(record => record.name === playerName)) {
        leaderboard.push({ name: playerName, score: punteggioAttuale });
        leaderboard.sort((a, b) => b.score - a.score); // Ordina per punteggio decrescente
        localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
        updateLeaderboard();
        gameOverSection.style.display = 'none'; // Nascondi game over
    }
});

// Funzione per aggiornare la classifica
function updateLeaderboard() {
    leaderboardList.innerHTML = '';
    leaderboard.forEach(score => {
        const li = document.createElement('li');
        li.textContent = `${score.name}: ${score.score}`;
        leaderboardList.appendChild(li);
    });
}

// Funzione per avviare il timer
function startTimer() {
    // Ripristina il tempo al valore iniziale
    seconds = 45;

    const countdownInterval = setInterval(() => {
        if (seconds > 0) {
            seconds -= 1; // Decremento di 1 secondo alla volta
            timerDisplay.textContent = `Tempo: ${seconds}`;
        } else {
            clearInterval(countdownInterval); // Fermare il timer
            gameOver();
        }
    }, 1000); // Intervallo di 1000ms (1 secondo)
}

// Aggiungere il listener per "ESC" solo quando il gioco non è finito
document.addEventListener("keydown", handleEscapeKey);

// Avvia il gioco fermato inizialmente
farComparireRifiuto();