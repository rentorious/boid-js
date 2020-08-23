class Boid {
  // static COLOR = [222, 180, 34];

  static WIDTH = 15;
  static HEIGHT = 30;

  static fov = {
    angle: 3.14 / 1.5,
    maxDist: 50,
  };
  static AGILITY = 0.025;

  static SEPARATION_DESIRE = 1.2;
  static ALIGNMENT_DESIRE = 0.75;
  static COHESION_DESIRE = 0.1;

  static MAX_SPEED = 1.2;

  constructor(pos, vel, speed, boids) {
    this.pos = pos;
    this.vel = vel;
    this.speed = speed;
    this.boids = boids;
    // field of vision, as radians left and right where the boid can see other boids
    // and max distance
    // Boid.fov = fov;

    // Object containg references to all other boids
    this.COLOR = [222, 180, 34];

    this.shouldDrawFov = false;
  }

  move() {
    // Check if boid is offscreen and teleport him to the other end
    if (this.isOutOfBounds()) this.teleportBack();

    let flockingVec = this.flockingActions();

    this.vel.normalize();
    this.vel.lerp(flockingVec, Boid.AGILITY);
    this.pos.add(this.vel.copy().mult(min(this.speed, Boid.MAX_SPEED)));
  }

  draw() {
    push();

    translate(this.pos.x, this.pos.y);
    noStroke();

    fill(this.COLOR);
    push();
    rotate(this.vel.heading() + PI / 2);
    triangle(-Boid.WIDTH / 2, 0, 0, -Boid.HEIGHT, Boid.WIDTH / 2, 0);
    pop();

    if (this.shouldDrawFov) this.drawFov();

    // Draw coords
    // this.drawCoordinates();

    pop();
  }

  flockingActions() {
    let neighbors = this.getNeighbors();

    let separationVec = this.separate(neighbors);
    let alignmentVec = this.align(neighbors);
    let cohesionVec = this.cohere(neighbors);

    separationVec.mult(Boid.SEPARATION_DESIRE);
    alignmentVec.mult(Boid.ALIGNMENT_DESIRE);
    cohesionVec.mult(Boid.COHESION_DESIRE);

    let flockingVec = createVector(0, 0);
    flockingVec.add(separationVec);
    flockingVec.add(alignmentVec);
    flockingVec.add(cohesionVec);

    return flockingVec;
  }

  separate(neighbors) {
    let reverseVecs = [];
    neighbors.forEach((neighbor) => {
      // vector connecting the boid and the neighbor
      let tmp = this.vecTo(neighbor);
      tmp.mult(-1);
      reverseVecs.push(tmp);
    });

    // Weighted sum
    reverseVecs.forEach((vec) => {
      vec.mult(1 / vec.mag());
    });

    let desiredVec = createVector(0, 0);
    for (let vec of reverseVecs) {
      desiredVec.add(vec);
    }

    return desiredVec;
  }

  align(neighbors) {
    let neigborDirVecs = neighbors.map((boid) => boid.vel);

    let desiredVec = createVector(0, 0);
    for (let vec of neigborDirVecs) {
      desiredVec.add(vec);
    }

    return desiredVec;
  }

  cohere(neighbors) {
    let center = createVector(0, 0);
    for (let neighbor of neighbors) center.add(this.vecTo(neighbor));

    if (neighbors.length) center.mult(1 / neighbors.length);
    else return createVector(0, 0);

    return center;
  }

  // HELPER FUCTIONS

  drawFov() {
    // Field Of View field
    push();
    rotate(this.getHeading());
    noStroke();
    fill("rgba(71, 71, 71, 0.25)");
    this.drawFovField();
    // axes
    // this.drawAxes();
    pop();

    // Get neighbors
    let neighbors = this.getNeighbors();

    // Draw lines conecting the boid to the neighbours
    neighbors.forEach((neighbor) => {
      let radVec = this.vecTo(neighbor);
      stroke(123);
      line(0, 0, radVec.x, radVec.y);
    });
  }

  drawFovField() {
    arc(
      0,
      0,
      2 * Boid.fov.maxDist,
      2 * Boid.fov.maxDist,
      -Boid.fov.angle,
      Boid.fov.angle
    );
  }

  drawAxes() {
    stroke("green");
    line(0, 0, Boid.fov.maxDist, 0);
    stroke("blue");
    line(0, 0, -Boid.fov.maxDist, 0);
    stroke("purple");
    line(0, 0, 0, -Boid.fov.maxDist);
    stroke("white ");
    line(0, 0, 0, Boid.fov.maxDist);
  }

  drawCoordinates() {
    fill(0);
    text(`${Math.floor(this.pos.x)} ${Math.floor(this.pos.y)}`, 0, 0);
  }

  isInFov(radVec) {
    return this.isInRange(radVec) && this.isInView(radVec);
  }

  isInRange(radVec) {
    return radVec.mag() < Boid.fov.maxDist;
  }

  isInView(radVec) {
    return (
      radVec.angleBetween(this.vel) < Boid.fov.angle &&
      radVec.angleBetween(this.vel) > -Boid.fov.angle
    );
  }

  getHeading() {
    return this.vel.heading();
  }

  getNeighbors() {
    let neighbors = [];

    this.boids.forEach((boid) => {
      if (this.isInFov(this.vecTo(boid))) neighbors.push(boid);
    });

    return neighbors;
  }

  vecTo(boid) {
    return boid.pos.copy().sub(this.pos);
  }

  isOutOfBounds() {
    if (
      this.pos.x > WIDTH ||
      this.pos.x < 0 ||
      this.pos.y > HEIGHT ||
      this.pos.y < 0
    )
      return true;

    return false;
  }

  teleportBack() {
    if (this.pos.x < 0) this.pos.x = WIDTH - 1;
    if (this.pos.x > WIDTH) this.pos.x = 1;
    if (this.pos.y > HEIGHT) this.pos.y = 1;
    if (this.pos.y < 0) this.pos.y = HEIGHT - 1;
  }

  setColor(values) {
    this.COLOR = values;
  }
}
