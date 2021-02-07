let tetrisField = document.querySelector(".tetrisField");
let tetrisScore = document.querySelector(".tetrisScore");
let gameSpeed = 800;
let score = 0;
let activeTetro = {
	shape: 0,
	x: 0,
	y: 0
};

let playField = [
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
	let tetrisScoreInnerHTML = '<h2>You score is : ' + score + '</h2>';
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
	let flagFullLine = true;
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
			score++;
			console.log('score:' + score);
		}
	}
}
//
function getNewTetro() {
	let i = getrondomIntInclusive(1, 7);
	activeTetro.x = 4;
	activeTetro.y = 0;
	switch (i) {
		case (1):
			activeTetro.shape = [
				[1],
				[1],
				[1],
				[1]
			];
			break;
		case (2):
			activeTetro.shape = [
				[1, 0, 0],
				[1, 1, 1]
			];
			break;
		case (3):
			activeTetro.shape = [
				[0, 0, 1],
				[1, 1, 1]
			];
			break;
		case (4):
			activeTetro.shape = [
				[1, 1],
				[1, 1]
			];
			break;
		case (5):
			activeTetro.shape = [
				[0, 1, 1],
				[1, 1, 0]
			];
			break;
		case (6):
			activeTetro.shape = [
				[1, 1, 0],
				[0, 1, 1]
			];
			break;
		case (7):
			activeTetro.shape = [
				[0, 1, 0],
				[1, 1, 1]
			];
			break;
	}
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
getNewTetro();
addActiveTetro();
draw();
setTimeout(startGame, gameSpeed);