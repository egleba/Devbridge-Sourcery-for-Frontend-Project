import _ from 'lodash';

let canvas;
let canvasWrapper;
let canvasWidth;
let canvasHeight;
let context;

let particleArray = [];

const colorParticleOrange = getComputedStyle(document.documentElement).getPropertyValue('--color-particle-orange');
const colorParticleGreen = getComputedStyle(document.documentElement).getPropertyValue('--color-particle-green');
const colorParticleBlue = getComputedStyle(document.documentElement).getPropertyValue('--color-particle-blue');
const colorParticleGrey = getComputedStyle(document.documentElement).getPropertyValue('--color-particle-grey');
const colorArray = [colorParticleOrange, colorParticleGreen, colorParticleBlue, colorParticleGrey];

const desktopMinWidth = getComputedStyle(document.documentElement).getPropertyValue('--desktop-min-width');
const tabletMinWidth = getComputedStyle(document.documentElement).getPropertyValue('--tablet-min-width');

const desktop = window.matchMedia(`(min-width:${desktopMinWidth}`);
const tablet = window.matchMedia(`(min-width:${tabletMinWidth}`);

let x;
let y;
let dx;
let dy;

function randomCoordinates() {
  x = (Math.random() * (canvasWrapper.offsetWidth * 2)) + 30;
  y = (Math.random() * (canvasWrapper.offsetHeight * 2)) + 30;
  dx = (Math.random() - 0.5) * 0.4;
  dy = (Math.random() - 0.5) * 0.4;
}

function updateCoordinates(particle) {
  const element = particle;
  if (element.x + element.radius > canvasWidth || element.x - element.radius < 0) {
    element.dx = -element.dx;
  }
  if (element.y + element.radius > canvasHeight || element.y - element.radius < 0) {
    element.dy = -element.dy;
  }
  element.x += element.dx;
  element.y += element.dy;
}

function Shape(shapeX, shapeY, shapeDX, shapeDY) {
  this.x = shapeX;
  this.y = shapeY + 30;
  this.dx = shapeDX;
  this.dy = shapeDY;
  this.radius = 15;
  this.angle = Math.atan2(this.x + 6, this.y + 6);
  this.color = colorParticleBlue;
  this.draw = function drawThis() {
    context.save();
    context.fillStyle = this.color;
    context.translate(this.x, this.y);
    context.rotate(this.angle);
    context.rotate(-0.5235987755982988);
    context.translate(-8, -8);
    context.beginPath();
    context.moveTo(3.125, 5.75);
    context.lineTo(2.47434165, 4.4486833);
    context.bezierCurveTo(2.19106942, 3.88213884, 2.30210728, 3.19789272, 2.75, 2.75);
    context.bezierCurveTo(3.19789272, 2.30210728, 3.88213884, 2.19106942, 4.4486833, 2.47434165);
    context.lineTo(5.75, 3.125);
    context.bezierCurveTo(7.16640786, 3.83320393, 8.83359214, 3.83320393, 10.25, 3.125);
    context.lineTo(11.5513167, 2.47434165);
    context.bezierCurveTo(12.1178612, 2.19106942, 12.8021073, 2.30210728, 13.25, 2.75);
    context.bezierCurveTo(13.6978927, 3.19789272, 13.8089306, 3.88213884, 13.5256584, 4.4486833);
    context.lineTo(12.875, 5.75);
    context.bezierCurveTo(12.1667961, 7.16640786, 12.1667961, 8.83359214, 12.875, 10.25);
    context.lineTo(13.5256584, 11.5513167);
    context.bezierCurveTo(13.8089306, 12.1178612, 13.6978927, 12.8021073, 13.25, 13.25);
    context.bezierCurveTo(12.8021073, 13.6978927, 12.1178612, 13.8089306, 11.5513167, 13.5256584);
    context.lineTo(10.25, 12.875);
    context.bezierCurveTo(8.83359214, 12.1667961, 7.16640786, 12.1667961, 5.75, 12.875);
    context.lineTo(4.4486833, 13.5256584);
    context.bezierCurveTo(3.88213884, 13.8089306, 3.19789272, 13.6978927, 2.75, 13.25);
    context.bezierCurveTo(2.30210728, 12.8021073, 2.19106942, 12.1178612, 2.47434165, 11.5513167);
    context.lineTo(3.125, 10.25);
    context.bezierCurveTo(3.83320393, 8.83359214, 3.83320393, 7.16640786, 3.125, 5.75);
    context.closePath();
    context.fill();
    context.restore();
  };
  this.update = function updateThis() {
    updateCoordinates(this);
    this.angle += (Math.PI / 60) / 6;
    this.draw();
  };
}

function Cross(crossX, crossY, crossDX, crossDY) {
  this.x = crossX;
  this.y = crossY + 30;
  this.dx = crossDX;
  this.dy = crossDY;
  this.radius = 15;
  this.angle = Math.atan2(this.y + 6, this.x + 6);
  this.color = colorParticleGreen;
  this.draw = function drawThis() {
    context.save();
    context.translate(this.x, this.y);
    context.rotate(this.angle);
    context.fillStyle = this.color;
    context.beginPath();
    context.moveTo(9.317, 6.522);
    context.lineTo(15.838, 6.522);
    context.lineTo(15.838, 9.317);
    context.lineTo(9.317, 9.317);
    context.lineTo(9.317, 15.838);
    context.lineTo(6.522, 15.838);
    context.lineTo(6.522, 9.317);
    context.lineTo(1.77635684e-15, 9.317);
    context.lineTo(1.77635684e-15, 6.522);
    context.lineTo(6.522, 6.522);
    context.lineTo(6.522, 0);
    context.lineTo(9.317, 0);
    context.lineTo(9.317, 6.522);
    context.closePath();
    context.fill();
    context.restore();
  };
  this.update = function updateThis() {
    updateCoordinates(this);
    this.angle += (Math.PI / 60) / 6;
    this.draw();
  };
}

function Circle(circleX, circleY, circleDX, circleDY, circleRadius) {
  this.x = circleX;
  this.y = circleY + 30;
  this.dx = circleDX;
  this.dy = circleDY;
  this.radius = circleRadius;
  this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
  this.draw = function drawThis() {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    context.fillStyle = this.color;
    context.fill();
  };
  this.update = function updateThis() {
    updateCoordinates(this);
    this.draw();
  };
}

function initParticle(amount, particle) {
  for (let i = 0; i < amount; i += 1) {
    randomCoordinates();
    switch (particle) {
      case 'circle':
        particleArray.push(new Circle(x, y, dx, dy, 6));
        break;
      case 'smallCircle':
        particleArray.push(new Circle(x, y, dx, dy, 3));
        break;
      case 'shape':
        particleArray.push(new Shape(x, y, dx, dy));
        break;
      case 'cross':
        particleArray.push(new Cross(x, y, dx, dy));
        break;
      default:
        particleArray.push(new Circle(x, y, dx, dy, 6));
    }
  }
}

function initDesktop() {
  if (canvasHeight > 2000) {
    initParticle(200, 'circle');
    initParticle(50, 'smallCircle');
    initParticle(70, 'shape');
    initParticle(70, 'cross');
  } else {
    initParticle(70, 'circle');
    initParticle(20, 'smallCircle');
    initParticle(10, 'shape');
    initParticle(10, 'cross');
  }
}

function initTablet() {
  if (canvasHeight > 2000) {
    initParticle(140, 'circle');
    initParticle(40, 'smallCircle');
    initParticle(50, 'shape');
    initParticle(50, 'cross');
  } else {
    initParticle(45, 'circle');
    initParticle(10, 'smallCircle');
    initParticle(10, 'shape');
    initParticle(10, 'cross');
  }
}

function initMobile() {
  if (canvasHeight > 2000) {
    initParticle(100, 'circle');
    initParticle(30, 'smallCircle');
    initParticle(40, 'shape');
    initParticle(40, 'cross');
  } else {
    initParticle(30, 'circle');
    initParticle(7, 'smallCircle');
    initParticle(7, 'shape');
    initParticle(7, 'cross');
  }
}

function init() {
  if (canvasHeight > 2000) {
    context.globalAlpha = 0.5;
  } else {
    context.globalAlpha = 0.3;
  }
  particleArray = [];
  if (desktop.matches) {
    initDesktop();
  } else if (tablet.matches) {
    initTablet();
  } else {
    initMobile();
  }
}

function animate() {
  requestAnimationFrame(animate);
  context.clearRect(0, 0, window.innerWidth, canvasWrapper.offsetHeight);
  for (let i = 0; i < particleArray.length; i += 1) {
    particleArray[i].update();
  }
}

function resizeWindow() {
  canvas.width = window.innerWidth;
  canvas.height = canvasWrapper.offsetHeight;
  init();
}

export default function initParticles() {
  if (document.querySelector('.particle-wrapper') != null) {
    canvas = document.querySelector('canvas');
    canvasWrapper = document.querySelector('.particle-wrapper');
    canvasWidth = window.innerWidth;
    canvasHeight = canvasWrapper.offsetHeight;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    context = canvas.getContext('2d');
    window.addEventListener('resize', _.debounce(resizeWindow, 100));
    animate();
    init();
  }
}
