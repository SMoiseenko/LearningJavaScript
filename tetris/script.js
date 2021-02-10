const enableDebug = true;
const tetrisField = document.querySelector(".tetrisField");
const tetrisScore = document.querySelector(".tetrisScore");
const cookieScore = 'maxScore';
const levelUpScore = 3000;
const changeSpeedMs = 35;
const initSpeedMs = 800;
let maxScore = 0;
let scoreGradation = [0, 100, 300, 700, 1500];
let gameSpeed = 800;
let score = 0;
let currentLevel = 0;
const activeTetro = {
	shape: 0,
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
		[0, 1, 0, 0],
		[0, 1, 0, 0],
		[0, 1, 0, 0],
		[0, 1, 0, 0]
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
function draw() {
	let tetrisScoreInnerHTML = '<h2>Score is : ' + ('000000' + score).slice(-6) + '</h2>' + '<h2>Max score : ' + ('000000' + maxScore).slice(-6) + '</h2>' + '<h2>Level : ' + currentLevel  + '</h2>';
	let tetrisFieldInnerHTML = '';

	for (let y = 0; y < playField.length; y++) {
		for (let x = 0; x < playField[y].length; x++) {
			switch (playField[y][x]) {
				case 0:
					tetrisFieldInnerHTML += '<div class="cell"></div>';
					break;
				case 1:
					tetrisFieldInnerHTML += '<div class="cell movingCell"></div>';
					break;
				case 2:
					tetrisFieldInnerHTML += '<div class="cell fixedCell"></div>';
					break;
			}
		}
	}
	tetrisField.innerHTML = tetrisFieldInnerHTML;
	tetrisScore.innerHTML = tetrisScoreInnerHTML;
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
	for (let y = 0; y < activeTetro.shape.length; y++) {
		for (let x = 0; x < activeTetro.shape[y].length; x++) {
			if (activeTetro.shape[y][x]) {
				playField[activeTetro.y + y][activeTetro.x + x] = activeTetro.shape[y][x];
			}
		}
	}
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
	checkFullLine()
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
		document.cookie = cookieScore + '=' + maxScore;
	}
}
function setDefaultScoreInCookie() {
	if (!document.cookie.includes(cookieScore)) document.cookie = cookieScore + '=' + 0;
	maxScore = parseInt(getCookie(cookieScore));
}
//
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
	let i = getrondomIntInclusive(0, 6);
	activeTetro.shape = figures[allFigures[i]];
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
	activeTetro.shape = activeTetro.shape[0].map((val, index) => activeTetro.shape.map((row) => row[index]).reverse());
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
			moveTetroDown()
			break;
		case (32):
			fallTetroDown();
			break;
	}
	addActiveTetro();
	draw();
}
//

//
function startGame() {
	moveTetroDown();
	addActiveTetro();
	draw();
	setTimeout(startGame, gameSpeed);
}
//begin is here
setDefaultScoreInCookie();
getNewTetro();
addActiveTetro();
draw();
setTimeout(startGame, gameSpeed);