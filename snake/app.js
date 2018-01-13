// VARIABLES
var canvas, ctx;
canvas = document.getElementById("snakeCanvas");
ctx = canvas.getContext("2d");

// game variables
var score, lives;

// grid variables
var rows, columns, sideLength;
sideLength = 10;
rows = canvas.height / sideLength;
columns = canvas.width / sideLength;


// snake variables
var position;

// food
var foodX, foodY;

// commands
var key; //leftPressed, upPressed, rightPressed, downPressed;


// EVENT LISTENERS
addEventListener("keydown", function(event) {

    if (event.keyCode === 37 && key !== "right") key = "left";
    if (event.keyCode === 38 && key !== "down") key = "up";
    if (event.keyCode === 39 && key !== "left") key = "right";
    if (event.keyCode === 40 && key !== "up") key = "down";
})

function init() {
    lives = 1;
    position = [[2, 2]]
    key = null;
    score = 0;

    generateFood();
}

function generateFood() {
    foodX = Math.floor(Math.random() * columns);
    foodY = Math.floor(Math.random() * rows);
}

function moveSnake() {
    var pos = position[position.length - 1]

    if (key === "left")     position.push([pos[0] - 1, pos[1]]);
    if (key === "up")       position.push([pos[0], pos[1] - 1]);
    if (key === "right")    position.push([pos[0] + 1, pos[1]]);
    if (key === "down")     position.push([pos[0], pos[1] + 1]);

    if (position.length > 1) position.shift();
}

function drawSnake() {
    ctx.beginPath();
    for (var i = 0; i < position.length; i++) {
        ctx.rect(position[i][0]*sideLength, position[i][1]*sideLength, sideLength, sideLength);
    }
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.closePath();
}

function drawFood() {
    ctx.beginPath();
    ctx.rect(foodX*sideLength, foodY*sideLength, sideLength, sideLength);
    ctx.fillStyle = "#f09";
    ctx.fill();
    ctx.closePath();
}

function showScore() {
    ctx.font = "16px Arial";
    ctx.fillText("Score: " + score, 8, 20);
}

function draw() {
    setTimeout( function() {
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        drawFood();
        moveSnake();
        drawSnake();
        showScore();
        

        var pos = position[position.length-1]
        if (pos[0] === foodX && pos[1] === foodY) {
            score++;
            position.unshift(position[0]);
            
            generateFood();
        } else {
            for (var i = 0; i < position.length-1; i++) {
                // snake eats itself
                if (pos[0] === position[i][0] && pos[1] === position[i][1]) {
                    alert("shucks");
                    init();
                }
            }
            if (pos[0] < 0 || pos[0] > columns - 1 || pos[1] < 0 || pos[1] > rows - 1) {
                // snake hits a will
                alert("shucks");
                init();
            }
        }

        requestAnimationFrame(draw);
    }, 40);
}

init();
draw();