class Spike {
  constructor(x, y, size = 24) {
    this.x = x;
    this.y = y;
    this.size = size;
  }

  draw() {
    fill("#D62828");
    triangle(
      this.x,
      this.y + this.size,
      this.x + this.size / 2,
      this.y,
      this.x + this.size,
      this.y + this.size,
    );
  }

  getAABB() {
    return {
      x: this.x,
      y: this.y,
      w: this.size,
      h: this.size,
    };
  }
}
