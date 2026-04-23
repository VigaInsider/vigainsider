let scorespan = document.getElementById("score");
let streakspan = document.getElementById("streak");
let cursor = document.getElementById("cursor");
let game = document.getElementById("game");
let lossSpan = document.getElementById("loss");

let screen = document.querySelector("body");
let setGame = function () {
	game.style.width = window.innerWidth * 0.8 + "px";
	game.style.height = window.innerHeight * 0.8 + "px";
	game.style.left = window.innerWidth * 0.1 + "px";
	game.style.top = window.innerHeight * 0.1 + "px";
};
let setScreen = function () {
	screen.style.width = window.innerWidth + "px";
	screen.style.height = window.innerHeight + "px";
};
let missed = 0;
setScreen(screen);
setGame();
let score = 0;
let streak = 0;
scorespan.innerText = score;
streakspan.innerText = streak;
lossSpan.innerText = missed;
const w = document.documentElement.clientWidth;
const h = document.documentElement.clientHeight;
let arraySp = [
	"assets/rubbish sprite bibita.png",
	"assets/rubbish sprite cardboard.png",
	"assets/rubbish sprite paper.png",
	"assets/rubbish sprite plastica.png",
	"assets/trash hold sprite.png",
];
let specialArray = [
	"assets/camilloBensoConteDiParkour.jfif",
	"assets/Matteotti.jfif",
	"assets/omicidioGGG.jfif",
	"assets/crispy.png",
];
function Spazzatura() {
	this.x =
		Math.floor(Math.random() * window.innerWidth * 0.65) +
		window.innerWidth * 0.1 +
		"px";
	this.y =
		Math.floor(Math.random() * (window.innerHeight * 0.65)) +
		window.innerHeight * 0.1 +
		"px";
	this.height = 15 + "vh";
	this.width = 15 + "vw";
	this.divSP = document.createElement("div");
	this.divSP.className = "spazzatura";
	this.divSP.style.position = "fixed";
	this.divSP.style.width = this.width;
	this.divSP.style.height = this.height;
	this.divSP.style.left = this.x;
	this.divSP.style.top = this.y;
	this.divSP.style.opacity = 1;
	let string;
	if (score > 5000) {
		string =
			"'" + specialArray[Math.floor(Math.random() * specialArray.length)] + "'";
	} else {
		string = "'" + arraySp[Math.floor(Math.random() * arraySp.length)] + "'";
	}
	this.divSP.style.backgroundImage = "url(" + string + ")";
	game.appendChild(this.divSP);
	let clicked = false;

	this.divSP.addEventListener("click", function name() {
		clicked = true;
		if (streak >= 5) {
			score += 10;
		} else {
			score += 5;
		}
		streak += 1;

		scorespan.innerText = score;
		streakspan.innerText = streak;

		this.animate(
			[
				// key frames
				{ transform: "rotate(180deg)" },
				{ transform: "scale(0.1)" },
			],
			{
				duration: 700,
				iterations: 1,
			}
		);
		setTimeout(() => {
			this.remove();
		}, 700);
	});

	setTimeout(() => {
		if (!clicked) {
			streak = 0;
			streakspan.innerText = streak;
			if (missed < 5) {
				missed += 1;
			}
			lossSpan.innerText = missed;
		}

		this.divSP.remove();
	}, 5000);
}

let timer = setInterval(() => {
	if (missed >= 5) {
		clearInterval(timer);

		let GameOver = document.createElement("h1");
		GameOver.innerText = "GAME OVER";
		GameOver.style.margin = "auto";
		GameOver.style.zIndex = 3;
		GameOver.id = "gameOver";
		game.appendChild(GameOver);
		let arr = [];

		do {
			arr = document.getElementsByClassName("spazzatura");

			for (let i = 0; i < arr.length; i++) {
				console.log("eliminato");
				arr.item(i).remove();
			}
		} while (arr.length >= 1);
	} else {
		let s = new Spazzatura();
	}
}, 500);

window.addEventListener("mousemove", move);

function move(event) {
	cursor.style.top = event.clientY + "px";
	cursor.style.left = event.clientX + "px";
}
document.body.addEventListener("click", animateCursor);
function animateCursor() {
	cursor.style.backgroundImage = "url('assets/trash_can-aperto.png')";
	setTimeout(() => {
		cursor.style.backgroundImage = "url('assets/trash-can-chiuso.png')";
	}, 700);
}
