
/**@type{CanvasRenderingContext2D}*/
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const ground = new Image();
ground.src = 'img/gameField.png';

const foodImg = new Image();
foodImg.src = 'img/food.png';

let box = 32;

let score = 0;

let dir;

let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 3) * box
}

let snake = [];
snake[0] = {
    x: 7 * box,
    y: 7 * box
}

document.addEventListener('keydown', direction);

function direction(event) {
    if (event.keyCode == 37 && dir != 'right') {
        dir = 'left';
    } else if (event.keyCode == 38 && dir != 'down') {
        dir = 'up';
    } else if (event.keyCode == 39 && dir != 'left') {
        dir = 'right';
    } else if (event.keyCode == 40 && dir != 'up') {
        dir = 'down';
    }
}

function eatTail(head, array){
    for(let i = 0; i< array.length; i++){
        if (head.x ==array[i].x && head.y ==array[i].y)
        clearInterval(game);
    }
}

function drawGame() {
    ctx.drawImage(ground, 0, 0);
    ctx.drawImage(foodImg, food.x, food.y);
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i == 0) ? '#c62828' : '#008000';
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }
    ctx.fillStyle = 'white';
    ctx.font = '50px Consolas';
    ctx.fillText(score, box * 2.5, box * 1.8);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (snakeX == food.x && snakeY == food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * 15 + 1) * box,
            y: Math.floor(Math.random() * 14 + 3) * box
        }
    }
    else snake.pop();

    if (snakeX < 1 * box || snakeX > 15 * box 
     || snakeY < 3 * box || snakeY > 16 * box) {
        clearInterval(game);
    }

    switch (dir) {
        case ('left'):
            snakeX -= box;
            break;
        case 'right':
            snakeX += box;
            break;
        case 'up':
            snakeY -= box;
            break;
        case 'down':
            snakeY += box;
            break;
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }
    eatTail(newHead, snake)

    snake.unshift(newHead);
}

let game = setInterval(drawGame, 100);