'use strict';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

class Ball {
  constructor(x, y, velX, velY, color, size) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill(); 
    
  }

  update() {
    if ((this.x + this.size) >= width) {
      this.velX = -(this.velX);
    }

    if ((this.x - this.size) <= 0) {
      this.velX = -(this.velX);
    }

    if ((this.y + this.size) >= height) {
      this.velY = -(this.velY);
    }

    if ((this.y - this.size) <= 0) {
      this.velY = -(this.velY);
    }

    this.x += this.velX;
    this.y += this.velY;
  }
}

const balls = [];

while (balls.length < 25) {
  const size = Math.floor(random(height/20, height/10));

  const ball = new Ball(
    random(0 + size, width - size),
    random(0 + size, height - size),
    random(-5, 5),
    random(-5, 5),
    randomRGB(),
    size,
  );

  balls.push(ball);
}

let color = 173;
let isRise = true;


function getBackgroundColor() {

  let color = 173;
  let isRise = true;

  return () => {

    if (color < 345 && color > 5 && isRise) {
    color = color + 0.1;
      return `hsl(${color}, 96%, 91%)`;
    }
    if (color < 345 && color > 5 && !isRise) {
      color = color - 0.1;
      return `hsl(${color}, 96%, 91%)`;
    }

    if (color >= 345) {
      isRise = false;
      color = color - 0.1;
      return `hsl(${color}, 96%, 91%)`;
    }
    if (color <= 5) {
      isRise = true;
      color = color + 0.1;
      return `hsl(${color}, 96%, 91%)`;
    }
  }
}

const background = getBackgroundColor();

function loop() {
  ctx.fillStyle = background();
  ctx.fillRect(0, 0, width, height);

  for (const ball of balls) {
    ball.draw();
    ball.update();
  }

  requestAnimationFrame(loop);
}

loop();
