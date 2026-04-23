let messaggioIniziale = document.getElementById("messaggioIniziale"); 
let messaggioGameOver = document.getElementById("messaggioGameOver");
let contenitoreGioco = document.getElementById("contenitoreGioco");
let punteggioDisplay = document.getElementById("punteggio");
let punteggioFinale = document.getElementById("punteggioFinale");

let punteggio = 0;
let secchio = {
    html: document.getElementById("secchio"),
    posx: 50,
    movimento: null,
    muoviDestra: () => {
        if (secchio.movimento) cancelAnimationFrame(secchio.movimento);
        function muovi() {
            if (secchio.posx < 85) { 
                secchio.posx += 1;
                secchio.html.style.left = secchio.posx + "vw";
                secchio.movimento = requestAnimationFrame(muovi);
            }
        }
        muovi();
    },
    muoviSinistra: () => {
        if (secchio.movimento) cancelAnimationFrame(secchio.movimento);
        function muovi() {
            if (secchio.posx > 5) { 
                secchio.posx -= 1;
                secchio.html.style.left = secchio.posx + "vw";
                secchio.movimento = requestAnimationFrame(muovi);
            }
        }
        muovi();
    },
    ferma: () => {
        if (secchio.movimento) {
            cancelAnimationFrame(secchio.movimento);
            secchio.movimento = null;
        }
    }
};

function Rifiuto() {
    this.html = document.createElement("div");
    this.html.classList.add("rifiuto");
    contenitoreGioco.appendChild(this.html);

    this.posx = Math.random() * 50 + 10; 
    this.posy = 0;

    this.html.style.left = this.posx + "vw";
    this.html.style.top = this.posy + "vh";

    this.velocita = 1; 

    this.caduta = () => {
        this.posy += this.velocita;
        this.html.style.top = this.posy + "vh";

        if (this.posy >= 85) { 
            if (this.posx >= secchio.posx - 5 && this.posx <= secchio.posx + 5) {
                this.html.remove();
                punteggio++;
                punteggioDisplay.innerHTML = punteggio;
            } else {
                gameOver();
            }
            clearInterval(this.interval);
        }
    };

    this.interval = setInterval(() => this.caduta(), 20);
}

let rifiutiInterval;

function comincia() {
    messaggioIniziale.style.display = "none";
    messaggioGameOver.style.display = "none";
    secchio.html.style.visibility = "visible";
    punteggio = 0;
    punteggioDisplay.innerHTML = punteggio;

    rifiutiInterval = setInterval(() => new Rifiuto(), 1500);
}

function gameOver() {
    clearInterval(rifiutiInterval);
    let rifiuti = document.querySelectorAll(".rifiuto");
    rifiuti.forEach(rifiuto => rifiuto.remove());
    secchio.ferma();
    messaggioGameOver.style.display = "block";
    punteggioFinale.textContent = punteggio;
}

function ricomincia() {
    messaggioGameOver.style.display = "none";
    secchio.html.style.left = "47.5%";
    comincia();
}

document.addEventListener('keydown', (event) => {
    event.preventDefault();
    if (event.key === 'ArrowLeft') secchio.muoviSinistra();
    if (event.key === 'ArrowRight') secchio.muoviDestra();
});

document.addEventListener('keyup', (event) => {
    event.preventDefault();
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') secchio.ferma();
});
