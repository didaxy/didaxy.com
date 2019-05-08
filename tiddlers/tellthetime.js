console.log("tellthetime.js is in the house");

function drawFace(ctx, radius) {
  var grad;

  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, 2 * Math.PI);
  ctx.fillStyle = "white";
  ctx.fill();

  grad = ctx.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 1.05);
  grad.addColorStop(0, "#333");
  grad.addColorStop(0.5, "white");
  grad.addColorStop(1, "#333");
  ctx.strokeStyle = grad;
  ctx.lineWidth = radius * 0.1;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
  ctx.fillStyle = "#333";
  ctx.fill();
}

function drawNumbers(ctx, radius) {
  var ang;
  var num;
  ctx.font = radius * 0.15 + "px arial";
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  for (num = 1; num < 13; num++) {
    ang = (num * Math.PI) / 6;
    ctx.rotate(ang);
    ctx.translate(0, -radius * 0.85);
    ctx.rotate(-ang);
    ctx.fillText(num.toString(), 0, 0);
    ctx.rotate(ang);
    ctx.translate(0, radius * 0.85);
    ctx.rotate(-ang);
  }
}

function drawTime(ctx, hitCtx, radius, time) {
  let dummy = 3;
  var now =
    time.hours < 0
      ? new Date()
      : new Date(
          `September 22, 1975 ${time.hours}:${time.minutes}:00`
        );
  var hour = now.getHours();
  var minute = now.getMinutes();
  var second = now.getSeconds();

  //this is all a mess, don't reuse variables
  //re-write the whole draw clock module.

  console.log(`hour is ${hour}`);
  const drawhour =
  (hour * Math.PI) / 6 +
  (minute * Math.PI) / (6 * 60) +
  (second * Math.PI) / (360 * 60);
   console.log(`hour is ${hour}`);

  //minute
  minute = (minute * Math.PI) / 30 + (second * Math.PI) / (30 * 60);
  drawHand(ctx, minute, radius * 0.8, radius * 0.07, "black");
  drawHand(hitCtx, minute, radius * 0.8, radius * 0.07, "blue");
  //hour
  hour = hour % 12;
  console.log(`hour is ${hour}`);


  
  drawHand(ctx, hour, radius * 0.5, radius * 0.07, "black");
  drawHand(hitCtx, hour, radius * 0.5, radius * 0.07, "red");
  // second
  // second = (second * Math.PI) / 30;
  // drawHand(ctx, second, radius * 0.9, radius * 0.02);
}

function drawHand(ctx, pos, length, width, fillColor) {
  console.log(`pos is ${pos}`);
  
  ctx.beginPath();
  ctx.lineWidth = width;
  ctx.strokeStyle = fillColor;
  ctx.lineCap = "round";
  ctx.moveTo(0, 0);
  ctx.rotate(pos);
  ctx.lineTo(0, -length);
  ctx.stroke();
  ctx.rotate(-pos);
} //clock.js

//   export {drawHand}

function drawClock(ctx, hitCtx, radius, time) {
  drawFace(ctx, radius);
  drawNumbers(ctx, radius);
  drawTime(ctx, hitCtx, radius, time);
}


var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var radius = canvas.height / 2;
ctx.translate(radius, radius);

const hitCanvas = document.createElement("canvas");
hitCanvas.height = canvas.height;
hitCanvas.width = canvas.width;
const hitCtx = hitCanvas.getContext("2d");
hitCtx.translate(radius, radius);

radius = radius * 0.9;

let state = {
  time: {
    hours: 23,
    minutes: 59
  },
  dragging: false
};

// document.body.appendChild(hitCanvas)
// document.body.insertBefore(hitCanvas, document.body.firstChild);

//setInterval(drawClock.bind(null,ctx,radius), 1000);
drawClock(ctx, hitCtx, radius, state.time);

canvas.addEventListener("mousedown", e => {
  const mousePos = {
    x: e.layerX,
    y: e.layerY
  };
  console.log(mousePos);

  const pixel = hitCtx.getImageData(mousePos.x, mousePos.y, 1, 1).data;

  const color = `rgb(${pixel[0]},${pixel[1]},${pixel[2]})`;
  console.log(color);

  console.log(pixel[2] == 255 ? "blue" : "not blue");

  state.dragging = true;
});

canvas.addEventListener("mouseup", e => {
  const mousePos = {
    x: e.layerX,
    y: e.layerY
  };
  console.log(mousePos);
  state.dragging = false;
});

canvas.addEventListener("mousemove", e => {
  if (state.dragging) {
    console.log(`${e.layerX},${e.layerY}`);
  }
});
