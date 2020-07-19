class Block {
  constructor(x, w, m, v, xc) {
    this.x = x;
    this.y = height - w - 300;
    this.w = w;
    this.v = v;
    this.m = m;
    this.xConstraint = xc;
  }

  hitWall() {
    return this.x <= 0;
  }

  reverse() {
    this.v *= -1;
  }

  collide(other) {
    return !(this.x + this.w < other.x || this.x > other.x + other.w);
  }

  bounce(other) {
    let sumM = this.m + other.m;
    let newV = ((this.m - other.m) / sumM) * this.v;
    newV += ((2 * other.m) / sumM) * other.v;
    return newV;
  }

  update() {
    this.x += this.v;
  }

  show() {
    const x = constrain(this.x, this.xConstraint, width);
    push();
    noFill();
    stroke(255);
    strokeWeight(5);
    square(x, this.y, this.w);
    stroke(246, 202, 9);
    square(x + 5, this.y + 5, this.w - 10);
    pop();
  }
}
