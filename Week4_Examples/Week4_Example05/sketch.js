let data;
let levelIndex = 0;

let world;
let player;
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

  // Spike collision
  for (let h of world.hazards) {
    if (playerHitsHazard(player, h)) {
      loadLevel(levelIndex);
      return;
    }
  }

  player.draw(world.theme.blob);

  fill(0);
  text(world.name, 10, 18);
  text("Move: A/D or ←/→ • Jump: Space/W/↑", 10, 36);

  // Auto advance
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

function playerHitsHazard(player, hazard) {
  return overlapAABB(
    {
      x: player.x - player.r,
      y: player.y - player.r,
      w: player.r * 2,
      h: player.r * 2,
    },
    hazard.getAABB(),
  );
}
