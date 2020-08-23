var myBoid;

var BOIDS_0 = [];
const COLOR_0 = "#6CCFF6";
var BOIDS_1 = [];
const COLOR_1 = "#31393C";
var BOIDS_2 = [];
const COLOR_2 = "#F79824";

var WIDTH;
var HEIGHT;
const BOID_NUM = 666;
const SPEED = 1.2;

const FR = 35;
function setup() {
  WIDTH = displayWidth;
  HEIGHT = displayHeight;

  createCanvas(WIDTH, HEIGHT - 30);

  BOIDS_0 = generateRandomBoids(Math.floor(BOID_NUM / 3), BOIDS_0);
  BOIDS_3 = generateRandomBoids(Math.floor(BOID_NUM / 3), BOIDS_1);
  BOIDS_2 = generateRandomBoids(Math.floor(BOID_NUM / 3), BOIDS_2);

  frameRate(FR);
}

function draw() {
  background(220);

  BOIDS_0.forEach((boid) => {
    boid.setColor(COLOR_0);
    boid.draw();
    boid.move();
  });

  BOIDS_1.forEach((boid) => {
    boid.setColor(COLOR_1);
    boid.draw();
    boid.move();
  });

  BOIDS_2.forEach((boid) => {
    boid.setColor(COLOR_2);
    boid.draw();
    boid.move();
  });
}

function generateRandomBoids(boidNum, boids) {
  for (let i = 0; i < boidNum; i++) {
    boids.push(getRandomBoid(boids));
  }

  return boids;
}

function getRandomBoid(boids) {
  // Random position
  let pos = createVector();
  pos.x = randInt(0, WIDTH);
  pos.y = randInt(0, HEIGHT);

  // Random direction
  let vel = p5.Vector.random2D();

  return new Boid(pos, vel, SPEED, boids);
}

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// document.addEventListener("keypress", (e) => {
//   if (e.key == "a") {
//     console.log("Blue boid added");
//     let newBoid = getRandomBoid();
//     newBoid.setColor([22, 11, 190]);
//     BOIDS.push(newBoid);
//   } else if (e.key == "p") {
//     console.log("paused");
//     frameRate(0);
//   } else if (e.key == "r") {
//     console.log("resumed");
//     frameRate(FR);
//   } else if (e.key == "w") {
//     console.log("Red boid sped up");
//     myBoid.speed += 0.1;
//   } else if (e.key == "s") {
//     console.log("My boi is slowing daun");
//     myBoid.speed -= 0.1;
//   }
// });
