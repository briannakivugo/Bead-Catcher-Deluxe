// =====================================
// 💎 BEAD CATCHER DELUXE
// Clean Version
// Forest Background Image
// =====================================


// =============================
// GAME STATES
// =============================

let gameState = "menu";


// =============================
// CANVAS
// =============================

let canvasWidth = 600;
let canvasHeight = 700;

let forestBackground;


// =============================
// BASKET
// =============================

let basketX;
let basketWidth = 60;
let basketHeight = 15;


// =============================
// BEADS
// =============================

let beadX;
let beadY;

let beadSize = 28;
let beadSpeed = 4;

let gemColor;
let gemPoints;

// Multiple Gems
let gems = [];


// =============================
// GAME DATA
// =============================

let score = 0;
let lives = 5;
let highScore = 0;


// =============================
// EFFECTS
// =============================

let particles = [];
let popups = [];


// =============================
// PRELOAD
// =============================

function preload(){

  forestBackground = loadImage(
    "assets/forest-background.png"
  );

}


// =============================
// SETUP
// =============================

function setup(){

  createCanvas(
    canvasWidth,
    canvasHeight
  );

  basketX = width / 2;

  resetBead();

  textAlign(
    CENTER,
    CENTER
  );

  highScore =
    Number(
      localStorage.getItem("beadHighScore")
    ) || 0;

}


// =============================
// MAIN LOOP
// =============================

function draw(){

  if(gameState === "menu"){

    drawMenu();

  }

  else if(gameState === "playing"){

    playGame();

  }

  else if(gameState === "gameover"){

    drawGameOver();

  }

}


// =============================
// MENU SCREEN
// =============================

  function drawMenu(){

  image(
    forestBackground,
    0,
    0,
    width,
    height
  );
    
  

  // =============================
  // Title
  // =============================

  fill(255, 220, 80);

  textSize(55);

  text(
    "💎",
    width / 2,
    120
  );

  textSize(42);

  text(
    "BEAD CATCHER",
    width / 2,
    200
  );

  textSize(32);

  text(
    "DELUXE",
    width / 2,
    245
  );


  // =============================
  // Play Button
  // =============================

rectMode(CENTER);

fill(25, 65, 45);

stroke(255, 210, 70);

strokeWeight(3);

rect(
  width / 2,
  380,
  220,
  70,
  20
);

noStroke();

fill(255, 220, 80);

textSize(32);

text(
  "PLAY",
  width / 2,
  380
);


  // =============================
  // High Score
  // =============================
    fill(255, 220, 80);
  
    textSize(22);

  text(
    "🏆 High Score: " + highScore,
    width / 2,
    500
  );


  // =============================
  // Instructions
  // =============================

  textSize(18);

  text(
    "Move your mouse to catch gems!",
    width / 2,
    550
  );

}


// =============================
// GAME
// =============================

function playGame(){


  // =============================
  // FOREST BACKGROUND
  // =============================

  image(
    forestBackground,
    0,
    0,
    width,
    height
  );


  // =============================
  // PARTICLES
  // =============================

  for(
    let i = particles.length - 1;
    i >= 0;
    i--
  ){

    let p = particles[i];

    push();

    fill(
      255,
      255,
      0
    );

    noStroke();

    ellipse(
      p.x,
      p.y,
      p.size
    );

    pop();


    p.x += p.vx;

    p.y += p.vy;

    p.life--;


    if(p.life <= 0){

      particles.splice(
        i,
        1
      );

    }

  }


  // =============================
  // FLOATING SCORE POPUPS
  // =============================

  for(
    let i = popups.length - 1;
    i >= 0;
    i--
  ){

    let p = popups[i];

    fill(255);

    stroke(0);

    strokeWeight(3);

    textSize(32);

    text(
      p.text,
      p.x,
      p.y
    );

    noStroke();

    p.y -= 2.5;

    p.life--;


    if(p.life <= 0){

      popups.splice(
        i,
        1
      );

    }

  }


  // =============================
  // BASKET DIFFICULTY
  // =============================

  if(score < 10){

    basketWidth = 60;

  }

  else if(score < 20){

    basketWidth = 55;

  }

  else if(score < 30){

    basketWidth = 40;

  }

  else if(score < 40){

    basketWidth = 30;

  }

  else{

    basketWidth = 20;

  }


  // =============================
  // BASKET MOVEMENT
  // =============================

  basketX = mouseX;

  basketX = constrain(
    basketX,
    basketWidth / 2,
    width - basketWidth / 2
  );


  // =============================
  // BASKET
  // =============================

  rectMode(CENTER);


  // Shadow

  fill(
    90,
    55,
    20
  );

  rect(
    basketX,
    height - 54,
    basketWidth + 10,
    basketHeight + 8,
    10
  );


  // Basket

  fill(
    181,
    101,
    29
  );

  rect(
    basketX,
    height - 60,
    basketWidth,
    basketHeight,
    10
  );


  // Rim

  stroke(
    120,
    70,
    20
  );

  strokeWeight(3);

  line(
    basketX - basketWidth / 2,
    height - 72,
    basketX + basketWidth / 2,
    height - 72
  );


  // =============================
  // Basket Weaving
  // =============================

  stroke(
    155,
    90,
    30
  );

  strokeWeight(1);

  for(
    let x = -basketWidth / 2 + 5;
    x <= basketWidth / 2 - 5;
    x += 10
  ){

    line(
      basketX + x,
      height - 70,
      basketX + x,
      height - 50
    );

  }

  noStroke();


  // =============================
  // MOVE GEM
  // =============================

  beadY += beadSpeed;


  // =============================
  // DRAW GEM
  // =============================

  push();

  translate(
    beadX,
    beadY
  );

  scale(0.2);
  
  // Outer Gem

  fill(gemColor);

  stroke(255);

  strokeWeight(2);

  beginShape();

  vertex(
    0,
    -18
  );

  vertex(
    15,
    -5
  );

  vertex(
    10,
    15
  );

  vertex(
    0,
    22
  );

  vertex(
    -10,
    15
  );

  vertex(
    -15,
    -5
  );

  endShape(CLOSE);


  // =============================
  // Gem Facets
  // =============================

  stroke(220);

  line(
    0,
    -18,
    0,
    22
  );

  line(
    -15,
    -5,
    15,
    -5
  );

  line(
    -10,
    15,
    10,
    15
  );

  line(
    -15,
    -5,
    0,
    22
  );

  line(
    15,
    -5,
    0,
    22
  );


  // =============================
  // Gem Sparkle
  // =============================

  noStroke();

  fill(255);

  ellipse(
    -4,
    -8,
    4
  );

  ellipse(
    5,
    -2,
    3
  );

  pop();


  // =============================
  // CATCH GEM
  // =============================

  if(

    beadY > height - 75 &&

    beadY < height - 45 &&

    beadX >
      basketX - basketWidth / 2 &&

    beadX <
      basketX + basketWidth / 2

  ){

    score += gemPoints;


    // Floating Score

    popups.push({

      x: beadX,

      y: beadY,

      text: "+" + gemPoints,

      life: 40

    });


    // Sparkles

    createSparkles(
      beadX,
      beadY
    );


    // Increase Speed

    beadSpeed += 0.15;


    // New Gem

    resetBead();

  }


  // =============================
  // MISS GEM
  // =============================

  if(beadY > height){

    lives--;

    resetBead();

  }


  // =============================
  // SCORE
  // =============================

  fill(255, 220, 80);

  textSize(16);

  text(
    "Score: " + score,
    width /8,
    35
  );


  // =============================
  // LIVES
  // =============================

  fill(255, 215, 0);

textSize(16);

text(
  "💛 ".repeat(lives),
  width / 7
  ,
  60
);
  
  
  // =============================
  // GAME OVER CHECK
  // =============================

  if(lives <= 0){

    if(score > highScore){

      highScore = score;

      localStorage.setItem(
        "beadHighScore",
        highScore
      );

    }

    gameState = "gameover";

  }

}


function drawGameOver(){

  background(
    25,
    65,
    45
  );

  fill(255, 220, 80);

  textSize(55);

  text(
    "GAME OVER",
    width / 2,
    200
  );

  textSize(30);

  text(
    "Score: " + score,
    width / 2,
    290
  );

  text(
    "🏆 Best: " + highScore,
    width / 2,
    340
  );
 
  // =============================
  // PLAY AGAIN
  // =============================


  fill(25, 65, 45);
  
  stroke(255, 210, 70);

  strokeWeight(3);

  rectMode(CENTER);

  rect(
    width / 2,
    450,
    250,
    70,
    20
  );


  fill(255, 220, 80);

  textSize(28);

  text(
    "PLAY AGAIN",
    width / 2,
    450
  );


  // =============================
  // CREDIT
  // =============================

  fill(255);

  textSize(18);

  textAlign(
    CENTER,
    CENTER
  );

  text(
    "This game was designed and created by Bri",
    width / 2,
    height - 65
  );

  text(
    "after completing summer game design programs at",
    width / 2,
    height - 50
  );

  text(
    "Northeastern University and Girls Who Code.",
    width / 2,
    height - 35
  );

  text(
    "© 2026 All rights reserved",
    width / 2,
    height - 20
  );

}


// =============================
// MOUSE CLICK
// =============================

function mousePressed(){


  // =============================
  // PLAY BUTTON
  // =============================

  if(gameState === "menu"){

    if(

      mouseX > width / 2 - 110 &&

      mouseX < width / 2 + 110 &&

      mouseY > 345 &&

      mouseY < 415

    ){

      startGame();

    }

  }


  // =============================
  // RESTART BUTTON
  // =============================

  else if(gameState === "gameover"){

    if(

      mouseX > width / 2 - 125 &&

      mouseX < width / 2 + 125 &&

      mouseY > 415 &&

      mouseY < 485

    ){

      startGame();

    }

  }

}


// =============================
// START GAME
// =============================

function startGame(){

  score = 0;

  lives = 5;

  beadSpeed = 4;

  particles = [];

  popups = [];

  gems = [];


  gems.push({

    x: beadX,

    y: beadY,

    speed: beadSpeed,

    color: gemColor,

    points: gemPoints

  });


  resetBead();

  gameState = "playing";

}


// =============================
// RESET GEM
// =============================

function resetBead(){

  beadX = random(
    40,
    width - 40
  );

  beadY = -20;


  let r = random();


  // =============================
  // Blue = 1 point
  // =============================

  if(r < 0.50){

    gemColor = color(
      0,
      180,
      255
    );

    gemPoints = 1;

  }


  // =============================
  // Green = 2 points
  // =============================

  else if(r < 0.75){

    gemColor = color(
      0,
      220,
      120
    );

    gemPoints = 2;

  }


  // =============================
  // Red = 3 points
  // =============================

  else if(r < 0.90){

    gemColor = color(
      255,
      60,
      60
    );

    gemPoints = 3;

  }


  // =============================
  // Gold = 5 points
  // =============================

  else if(r < 0.98){

    gemColor = color(
      255,
      210,
      0
    );

    gemPoints = 5;

  }


  // =============================
  // Diamond = 10 points
  // =============================

  else{

    gemColor = color(255);

    gemPoints = 10;

  }

}


// =============================
// CREATE SPARKLES
// =============================

function createSparkles(
  x,
  y
){

  for(
    let i = 0;
    i < 18;
    i++
  ){

    particles.push({

      x: x,

      y: y,

      vx: random(
        -3,
        3
      ),

      vy: random(
        -3,
        3
      ),

      size: random(
        4,
        8
      ),

      life: 45

    });

  }

}
