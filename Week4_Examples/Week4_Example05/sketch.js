let data;
let levelIndex = 0;

let world;
let player;

// Prevent repeated level reloads
let advancing = false;

function preload() {
  data = loadJSON("levels.json");
}

function setup() {
  createCanvas(640, 360);
  player = new BlobPlayer();
  loadLevel(0);

  noStroke();
  textFont("sans-serif");
  textSize(14);
}

function draw() {
  world.drawWorld();

  player.update(world.platforms);
  player.draw(world.theme.blob);

  // HUD
  fill(0);
  text(world.name, 10, 18);
  text("Move: A/D or ←/→ • Jump: Space/W/↑", 10, 36);

  // ---- AUTO LEVEL ADVANCE (FIXED) ----
  if (!advancing && player.x > width - player.r) {
    advancing = true;
    const next = (levelIndex + 1) % data.levels.length;
    loadLevel(next);
  }
}

function keyPressed() {
  if (key === " " || key === "W" || key === "w" || keyCode === UP_ARROW) {
    player.jump();
  }
}

function loadLevel(i) {
  levelIndex = i;
  advancing = false;

  world = new WorldLevel(data.levels[levelIndex]);
  resizeCanvas(640, 360);

  player.spawnFromLevel(world);
}
