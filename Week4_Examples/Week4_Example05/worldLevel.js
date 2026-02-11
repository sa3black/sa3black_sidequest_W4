class WorldLevel {
  constructor(data) {
    this.name = data.name;
    this.gravity = data.gravity;
    this.jumpV = data.jumpV;
    this.theme = data.theme;
    this.start = data.start;

    this.platforms = [];
    this.hazards = [];

    const rows = data.platformRows;

    // Ground
    const g = rows.ground;
    for (let i = 0; i < g.count; i++) {
      this.platforms.push(
        new Platform(
          i * g.tileWidth,
          g.y,
          g.tileWidth,
          g.tileHeight,
          this.theme.platform,
        ),
      );
    }

    // Steps
    for (let step of rows.steps) {
      for (let i = 0; i < step.count; i++) {
        this.platforms.push(
          new Platform(step.x + i * 40, step.y, 40, 12, this.theme.platform),
        );
      }
    }

    // Spikes
    if (data.hazards) {
      const h = data.hazards;
      for (let i = 0; i < h.count; i++) {
        this.hazards.push(new Spike(h.startX + i * h.spacing, h.y));
      }
    }
  }

  drawWorld() {
    background(this.theme.bg);

    for (let p of this.platforms) {
      p.draw();
    }

    for (let h of this.hazards) {
      h.draw();
    }
  }

  inferWidth(w) {
    return w;
  }

  inferHeight(h) {
    return h;
  }
}
