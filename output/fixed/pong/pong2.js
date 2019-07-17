//pong2.js
'use strict';
const can = document.createElement('canvas');
const ctx = /** @type {CanvasRenderingContext2D}  */can.getContext('2d');

document.body.appendChild(can);
const   height = can.height = can.width,
        width = can.width;
can.id = "game";
let ballX = width/2,
    ballY = height/2,
    ballRadius = width/10,
    running = true;
let frame;


//void ctx.arc(x, y, radius, startAngle, endAngle [, anticlockwise]);
document.addEventListener("keydown", onKeyDown);

function drawBall() {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    // ctx.fillRect(0, 0, can.width, can.height);
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, Math.sin(Date.now()/200), 6, false);
    ctx.lineTo(ballX, ballY);
    ctx.lineTo(ballX + ballRadius * Math.cos(0.1), ballY + ballRadius * Math.sin(0.1));
    ctx.strokeStyle = 'black';
    ctx.fillStyle = 'yellow';
    ctx.fill();
    ctx.stroke();
}  

function onKeyDown(e) {
    running = false;
}

function tick() {
    drawBall();
    if (running) {
        frame = window.requestAnimationFrame(tick);
    }
    else {
        window.cancelAnimationFrame(frame)
    }
}

tick();

