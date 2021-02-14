const enableDebug = false;
const tetrisField = document.querySelector(".tetrisField");
const tetrisScore = document.querySelector(".tetrisScore");
const nextTetroDiv = document.getElementById("nextTetro");
const playPauseButton = document.getElementById('playPayse');
const gameOverDiv = document.getElementById('gameOver');
const cookieScore = 'maxScore';
const cookiePathandMaxAge = '; path=/; expires=Thu, 31 Dec 2099 23:59:59 GMT';
const levelUpScore = 3000;
const changeSpeedMs = 35;
const initSpeedMs = 800;
let wasFirstTetroGenerated = false;
let maxScore = 0;
let scoreGradation = [0, 100, 300, 700, 1500];
let gameSpeed = 800;
let score = 0;
let currentLevel = 0;
let isGameOnPause = true;
let isGameNew = true;
let isGameOver = false;
let playGame = null;
const activeTetro = {
	shape: 0,
	nextShape: 0,
	x: 0,
	y: 0
};
const debugInfo = {};
const allFigures = 'OIZSLJT';
const figures = {
	O: [
		[1, 1],
		[1, 1]
	],
	I: [
		[1, 1, 1, 1],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0]
	],
	Z: [
		[1, 1, 0],
		[0, 1, 1],
		[0, 0, 0]
	],
	S: [
		[0, 1, 1],
		[1, 1, 0],
		[0, 0, 0]
	],
	L: [
		[0, 1, 0],
		[0, 1, 0],
		[0, 1, 1]
	],
	J: [
		[0, 1, 0],
		[0, 1, 0],
		[1, 1, 0]
	],
	T: [
		[1, 1, 1],
		[0, 1, 0],
		[0, 0, 0]
	]
};
const oldPlayField = Array(20).fill(Array(10).fill(0));
const playField = [
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];
//
function drawField(field) {
	let innerText = '';
	for (let y = 0; y < field.length; y++) {
		for (let x = 0; x < field[y].length; x++) {
			switch (field[y][x]) {
				case 0:
					innerText += '<div class="cell"></div>';
					break;
				case 1:
					innerText += '<div class="cell movingCell"></div>';
					break;
				case 2:
					innerText += '<div class="cell fixedCell"></div>';
					break;
			}
		}
	}
	return innerText;
}
function draw() {

	tetrisField.innerHTML = drawField(playField);
	nextTetroDiv.innerHTML = drawField(activeTetro.nextShape);
	nextTetroDiv.style.width = activeTetro.nextShape.length * 30 + 'px';
	tetrisScore.innerHTML = '<h2>'
		+ 'Level : '
		+ currentLevel
		+ '</br>Score : '
		+ ('000000' + score).slice(-6)
		+ '</br>Max score : '
		+ ('000000' + maxScore).slice(-6)
		+ '</h2>';
	printDebugInfo(enableDebug);

}
function printDebugInfo(predicate) {
	if (predicate) {
		debugInfo.Score = score;
		debugInfo.MaxScore = maxScore;
		debugInfo.MaxScoreInCookie = getCookie(cookieScore);
		debugInfo.Level = currentLevel;
		debugInfo.GameSpeed = gameSpeed;

		console.log(debugInfo);
	}
}
//
function removePrevActiveTetro() {
	for (let y = 0; y < playField.length; y++) {
		for (let x = 0; x < playField[y].length; x++) {
			if (playField[y][x] === 1) {
				playField[y][x] = 0;
			}
		}
	}
}
//
function addActiveTetro() {
	removePrevActiveTetro();
	if (hasCollisions()) {
		gameOver();
	}
	for (let y = 0; y < activeTetro.shape.length; y++) {
		for (let x = 0; x < activeTetro.shape[y].length; x++) {
			if (activeTetro.shape[y][x]) {
				playField[activeTetro.y + y][activeTetro.x + x] = activeTetro.shape[y][x];
			}
		}
	}
}
function gameOver() {
	isGameOver = true;
	clearInterval(playGame);
	playPauseButton.textContent = 'START NEW GAME';
	playPauseButton.style.backgroundColor = '#c62828';
	gameOverDiv.style.display = 'block';
	setTimeout(()=>alert('GAME OVER WITH SCORE ' + score),10);
	
}
function changeLevelAndSpeed() {
	currentLevel = Math.trunc(score / levelUpScore); //800 - 1 - 100 - 18
	gameSpeed = initSpeedMs - changeSpeedMs * currentLevel;
}
//
function hasCollisions() {
	for (let y = 0; y < activeTetro.shape.length; y++) {
		for (let x = 0; x < activeTetro.shape[y].length; x++) {
			if (activeTetro.shape[y][x] &&
				(playField[activeTetro.y + y] === undefined ||
					playField[activeTetro.y + y][activeTetro.x + x] === undefined ||
					playField[activeTetro.y + y][activeTetro.x + x] === 2)) {
				return true;
			}
		}
	}
	return false;
}
//
function fixTetro() {
	for (let y = playField.length - 1; y >= 0; y--) {
		for (let x = 0; x < playField[y].length; x++) {
			if (playField[y][x] === 1) {
				playField[y][x] = 2;
			}
		}
	}
	checkFullLine();
	getNewTetro();
}
//
function checkFullLine() {
	let flagFullLine = true, totalLines = 0;
	for (let y = playField.length - 1; y >= 0; y--) {
		flagFullLine = true;
		for (let x = 0; x < playField[y].length; x++) {
			if (playField[y][x] !== 2) {
				flagFullLine = false;
				break;
			}
		}
		if (flagFullLine) {
			for (let y1 = y; y1 > 0; y1--) {
				for (let x = 0; x < playField[y].length; x++) {
					playField[y1][x] = playField[y1 - 1][x];
				}
			}
			y++;
			totalLines++;
		}
	}
	score += scoreGradation[totalLines];
	saveScore();
	changeLevelAndSpeed();
}
//
function saveScore() {
	if (maxScore < score) {
		maxScore = score;
		document.cookie = cookieScore + '=' + maxScore + cookiePathandMaxAge;
	}
}
function setDefaultScoreInCookie() {
	if (!document.cookie.includes(cookieScore)) document.cookie = cookieScore + '=' + 0;
	maxScore = parseInt(getCookie(cookieScore));
}
//get cookie by name
function getCookie(name) {
	let cookies, c;
	cookies = document.cookie.split('; ');
	for (let i = 0; i < cookies.length; i++) {
		c = cookies[i].split('=');
		if (c[0] == name) {
			return c[1];
		}
	}
	return "";
}
//
function getNewTetro() {

	if (!wasFirstTetroGenerated) {
		activeTetro.shape = figures[allFigures[getrondomIntInclusive(0, 6)]];
		wasFirstTetroGenerated = true;
	} else {
		activeTetro.shape = activeTetro.nextShape;
	}
	activeTetro.nextShape = figures[allFigures[getrondomIntInclusive(0, 6)]];
	activeTetro.x = 4;
	activeTetro.y = 0;
}
//
function getrondomIntInclusive(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
//fall tetro
function fallTetroDown() {
	do {
		activeTetro.y += 1;
	} while (!hasCollisions());
	activeTetro.y -= 1;
	addActiveTetro();
	fixTetro();
}
//rotate tetro
function rotateTetro() {
	const prevTetroState = activeTetro.shape;
	activeTetro.shape = activeTetro.shape.map((val, index) => activeTetro.shape.map((row) => row[index]).reverse());
	if (hasCollisions()) {
		activeTetro.shape = prevTetroState;
	}
}
//move tetro left
function moveTetroLeft() {
	activeTetro.x -= 1;
	if (hasCollisions()) {
		activeTetro.x += 1;
	}
}
//move tetro right
function moveTetroRight() {
	activeTetro.x += 1;
	if (hasCollisions()) {
		activeTetro.x -= 1;
	}
}
//move tetro down
function moveTetroDown() {
	activeTetro.y += 1;
	if (hasCollisions()) {
		activeTetro.y -= 1;
		fixTetro();
	}
}
// keyboard handler
document.onkeydown = function (e) {
	if (!isGameOnPause && !isGameOver) {
		switch (e.keyCode) {
			case (37):
				moveTetroLeft();
				break;
			case (38):
				rotateTetro();
				break;
			case (39):
				moveTetroRight();
				break;
			case (40):
				moveTetroDown();
				break;
			case (32):
				fallTetroDown();
				break;

		}
		addActiveTetro();
		draw();
	}
	if (e.keyCode === 83) {
		buttonHandler();
	}
}

playPauseButton.onclick = buttonHandler;

function buttonHandler() {
	playPauseButton.blur();
	if (isGameNew || isGameOver) {
		isGameNew = isGameOnPause = isGameOver = false;
		clearField();
		getNewTetro();
		addActiveTetro();
		draw();
		playGame = setInterval(oneGameStep, gameSpeed);
		gameOverDiv.style.display = 'none';
		playPauseButton.textContent = 'PAUSE';
		playPauseButton.style.backgroundColor = '#699e3c';
	} else if (isGameOnPause) {
		isGameOnPause = false;
		playGame = setInterval(oneGameStep, gameSpeed);
		playPauseButton.textContent = 'PAUSE';
		playPauseButton.style.backgroundColor = '#699e3c';

	} else {
		isGameOnPause = true;
		clearInterval(playGame);
		playPauseButton.textContent = 'PLAY';
		playPauseButton.style.backgroundColor = '#ffd400';
	}
};
function clearField() {
	for (let y = 0; y < playField.length; y++) {
		playField[y].fill(0);
	}
}

//
function oneGameStep() {
	moveTetroDown();
	addActiveTetro();
	draw();
	//if (isGameOver) 
}

//begin is here
setDefaultScoreInCookie();
draw();