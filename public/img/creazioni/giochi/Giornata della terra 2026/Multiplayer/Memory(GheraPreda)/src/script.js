const grid = document.getElementById('game-grid');
const movesDisplay = document.getElementById('moves');
const score1Display = document.getElementById('score1');
const score2Display = document.getElementById('score2');
const streak1Display = document.getElementById('streak1');
const streak2Display = document.getElementById('streak2');
const p1Area = document.getElementById('player1-area');
const p2Area = document.getElementById('player2-area');
const nameOverlay = document.getElementById('name-prompt-overlay');
const gameOverOverlay = document.getElementById('game-over-overlay');
const startBtn = document.getElementById('start-game-btn');
const restartBtn = document.getElementById('restart-btn');
const changeNamesBtn = document.getElementById('change-names-btn');

let cardsChosen = [];
let cardsChosenId = [];
let cardsWon = [];
let moves = 0;
let playerNames = ["Giocatore 1", "Giocatore 2"];
let scores = [0, 0];
let bestStreaks = [0, 0];
let currentTurnPairs = 0; 
let activePlayer = 0;

const cardArray = [
    { name: 'recycle', emoji: '♻️' }, { name: 'recycle', emoji: '♻️' },
    { name: 'leaf', emoji: '🍃' }, { name: 'leaf', emoji: '🍃' },
    { name: 'sun', emoji: '☀️' }, { name: 'sun', emoji: '☀️' },
    { name: 'wind', emoji: '🌬️' }, { name: 'wind', emoji: '🌬️' },
    { name: 'earth', emoji: '🌍' }, { name: 'earth', emoji: '🌍' },
    { name: 'car', emoji: '🚗' }, { name: 'car', emoji: '🚗' },
    { name: 'water', emoji: '💧' }, { name: 'water', emoji: '💧' },
    { name: 'bulb', emoji: '💡' }, { name: 'bulb', emoji: '💡' },
    { name: 'bike', emoji: '🚲' }, { name: 'bike', emoji: '🚲' },
    { name: 'sprout', emoji: '🌱' }, { name: 'sprout', emoji: '🌱' }
];

function confirmNames() {
    const p1 = document.getElementById('input-p1').value.trim();
    const p2 = document.getElementById('input-p2').value.trim();
    playerNames[0] = p1 || "Giocatore 1";
    playerNames[1] = p2 || "Giocatore 2";
    document.getElementById('name1').textContent = playerNames[0];
    document.getElementById('name2').textContent = playerNames[1];
    nameOverlay.classList.remove('flex-active');
}

function createBoard() {
    grid.innerHTML = '';
    cardArray.sort(() => 0.5 - Math.random());
    cardArray.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'memory-card';
        card.setAttribute('data-id', index);
        card.innerHTML = `<div class="front">${item.emoji}</div><div class="back">?</div>`;
        card.addEventListener('click', flipCard);
        grid.appendChild(card);
    });
}

function flipCard() {
    let cardId = this.getAttribute('data-id');
    if (cardsChosenId.includes(cardId) || cardsChosen.length === 2) return;
    this.classList.add('flipped');
    cardsChosen.push(cardArray[cardId].name);
    cardsChosenId.push(cardId);
    if (cardsChosen.length === 2) {
        moves++;
        movesDisplay.textContent = moves;
        
        const statsBar = document.querySelector('.stats-bar');
        statsBar.classList.add('pulse');
        setTimeout(() => statsBar.classList.remove('pulse'), 300);

        setTimeout(checkForMatch, 800);
    }
}

function checkForMatch() {
    const cards = document.querySelectorAll('.memory-card');
    const [id1, id2] = cardsChosenId;
    if (cardsChosen[0] === cardsChosen[1]) {
        cards[id1].removeEventListener('click', flipCard);
        cards[id2].removeEventListener('click', flipCard);
        cardsWon.push(cardsChosen);
        scores[activePlayer]++;
        currentTurnPairs++; 
        
        if (currentTurnPairs >= 2) {
            let actualStreak = currentTurnPairs - 1;
            if (actualStreak > bestStreaks[activePlayer]) bestStreaks[activePlayer] = actualStreak;
        }
    } else {
        setTimeout(() => {
            cards[id1].classList.remove('flipped');
            cards[id2].classList.remove('flipped');
        }, 500);
        currentTurnPairs = 0; 
        activePlayer = activePlayer === 0 ? 1 : 0;
    }
    updateUI();
    cardsChosen = [];
    cardsChosenId = [];
    if (cardsWon.length === cardArray.length / 2) {
        document.getElementById('winner-message').textContent = scores[0] > scores[1] ? `Vince ${playerNames[0]}! 🏆` : (scores[1] > scores[0] ? `Vince ${playerNames[1]}! 🏆` : "Pareggio! 🤝");
        gameOverOverlay.classList.add('flex-active');
    }
}

function updateUI() {
    score1Display.textContent = scores[0];
    score2Display.textContent = scores[1];
    streak1Display.textContent = bestStreaks[0];
    streak2Display.textContent = bestStreaks[1];
    p1Area.classList.toggle('player-active', activePlayer === 0);
    p2Area.classList.toggle('player-active', activePlayer === 1);
}

function resetGame() {
    scores = [0, 0]; moves = 0; activePlayer = 0; cardsWon = []; currentTurnPairs = 0;
    movesDisplay.textContent = 0;
    gameOverOverlay.classList.remove('flex-active');
    createBoard();
    updateUI();
}

startBtn.addEventListener('click', confirmNames);
restartBtn.addEventListener('click', resetGame);
changeNamesBtn.addEventListener('click', () => {
    gameOverOverlay.classList.remove('flex-active');
    nameOverlay.classList.add('flex-active');
});

createBoard();