let main = document.querySelector(".main");
let gameSpeed = 400;
let score = 0;
let playField = [
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0]
];


function draw(){
	let mainInnerHTML = '<h2>TETRIS</h2>';

	for (let y = 0; y < playField.length; y++){
		for (let x = 0; x <playField[y].length; x++) {
			switch(playField[y][x]){
				case 0:
				mainInnerHTML+='<div class="cell"></div>';
				break;
				case 1:
				mainInnerHTML+='<div class="cell movingCell"></div>';
				break;
				case 2:
				mainInnerHTML+='<div class="cell fixedCell"></div>';
				break;
			}
		} 
	}
	main.innerHTML = mainInnerHTML;	
}

function fixTetro(){
	for (let y = playField.length-1; y >= 0; y--){
		for (let x = 0; x <playField[y].length; x++) {
			if (playField[y][x] === 1){
				playField[y][x] = 2;
			}
		} 
	}
	checkFullLine()

	getNewTetro();
}

function checkFullLine(){
	let flagFullLine = true;
	for (let y = playField.length-1; y >= 0; y--){
		flagFullLine = true;
		for (let x = 0; x <playField[y].length; x++) {
			if (playField[y][x]!==2){
				flagFullLine=false;
				break;
			}
		}
		if(flagFullLine){
			for (let y1 = y; y1 > 0; y1--){
			for (let x = 0; x <playField[y].length; x++) {
				 playField[y1][x]=playField[y1-1][x];
			}
		}
		y++;
			score++;
			console.log('score:'+score);
		}
	}
}

function getNewTetro(){
	playField[0] = [0,0,0,0,1,1,0,0,0,0];
		playField[1] = [0,0,0,0,1,1,0,0,0,0];
	/*let i = getrondomIntInclusive(1,7);
	switch(i){
		case(1):
		playField[0] = [0,0,0,1,1,1,1,0,0,0];
		break;
		case(2):
		playField[0] = [0,0,0,1,0,0,0,0,0,0];
		playField[1] = [0,0,0,1,1,1,0,0,0,0];
		break;	
		case(3):
		playField[0] = [0,0,0,0,0,0,1,0,0,0];
		playField[1] = [0,0,0,0,1,1,1,0,0,0];
		break;	
		case(4):
		playField[0] = [0,0,0,0,1,1,0,0,0,0];
		playField[1] = [0,0,0,0,1,1,0,0,0,0];
		break;	
		case(5):
		playField[0] = [0,0,0,0,1,1,0,0,0,0];
		playField[1] = [0,0,0,1,1,0,0,0,0,0];
		break;	
		case(6):
		playField[0] = [0,0,0,1,1,0,0,0,0,0];
		playField[1] = [0,0,0,0,1,1,0,0,0,0];
		break;	
		case(7):
		playField[0] = [0,0,0,0,1,0,0,0,0,0];
		playField[1] = [0,0,0,1,1,1,0,0,0,0];
		break;			
	}*/
}

function getrondomIntInclusive(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
//move down
function moveTetroDown(){
	if(canTetroMoveDown()){
		for (let y = playField.length-1; y >= 0; y--){
			for (let x = 0; x <playField[y].length; x++) {
				if (playField[y][x] === 1){
					playField[y][x] = 0 ;
					playField[y+1][x] = 1;
				}
			}
		}
	} else {
		fixTetro();
	}
}

function canTetroMoveDown(){
	for (let y = playField.length-1; y >= 0; y--){
		for (let x = 0; x <playField[y].length; x++) {
			if (playField[y][x] === 1){
				if (y === playField.length-1 || playField[y+1][x]===2 ){
					return false;
				}
			}
		}
	} return true;
}
//move left
function moveTetroLeft(){
	if(canTetroMoveLeft()){
		for (let y = playField.length-1; y >= 0; y--){
			for (let x = 0; x <playField[y].length; x++) {
				if (playField[y][x] === 1){
					playField[y][x] = 0 ;
					playField[y][x-1] = 1;
				}
			}
		}
	}
}

function canTetroMoveLeft(){
	for (let y = playField.length-1; y >= 0; y--){
		for (let x = 0; x <playField[y].length; x++) {
			if (playField[y][x] === 1){
				if (x === 0 || playField[y][x-1] === 2){
					return false;
				}
			}
		}
	} return true;
}
//move right
function moveTetroRight(){
	if(canTetroMoveRight()){
		for (let y = playField.length-1; y >= 0; y--){
			for (let x = playField[y].length-1; x >=0; x--) {
				if (playField[y][x] === 1){
					playField[y][x] = 0 ;
					playField[y][x+1] = 1;
				}
			}
		}
	}
}

function canTetroMoveRight(){
	for (let y = playField.length-1; y >= 0; y--){
		for (let x = 0; x <playField[y].length; x++) {
			if (playField[y][x] === 1){
				if (x ===playField[y].length-1 || playField[y][x+1] === 2){
					return false;
				}
			}
		}
	} return true;
}
//fall tetro
function fallTetroDown(){
	while(canTetroMoveDown()){
		moveTetroDown();
		draw();
	}
}

function rotateTetro(){
console.log('function not realized yet');
}

document.onkeydown = function(e){
	switch(e.keyCode){
		case(37):
		moveTetroLeft();
		break;
		case(38):
		rotateTetro();
		break;
		case(39):
		moveTetroRight();
		break;
		case(40):
		moveTetroDown()
		break;
		case(32):
		fallTetroDown();
		break;
	}
	draw();
}

function startGame(){
	draw();
	moveTetroDown();
	setTimeout(startGame, gameSpeed);	
}
//begin is here
getNewTetro();
startGame();
