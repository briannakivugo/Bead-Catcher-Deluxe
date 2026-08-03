// =====================================
// 💎 BEAD CATCHER DELUXE
// Stage 2: Menu + Game States
// =====================================

// GAME STATES
let gameState = "menu";

// Canvas
let canvasWidth = 600;
let canvasHeight = 700;

// Basket
let basketX;
let basketWidth = 50;
let basketHeight = 15;

// Bead
let beadX;
let beadY;
let beadSize = 28;
let beadSpeed = 4;
let gemColor;
let gemPoints;

// Game data
let score = 0;
let lives = 5;
let highScore = 0;

// Particles 
let particles = [];


// =============================
// SETUP
// =============================

function setup(){

  createCanvas(canvasWidth, canvasHeight);

  basketX = width/2;

  resetBead();

  textAlign(CENTER, CENTER);

  highScore = Number(localStorage.getItem("beadHighScore")) || 0;
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

  background(120,210,255);

  // Clouds
  fill(255);
  ellipse(100,80,80,40);
  ellipse(150,80,100,50);

  ellipse(450,100,100,45);
  ellipse(500,100,70,35);

  // Ground
  rectMode(CORNER);      // <-- ADD THIS
  fill(50,120,50);
  rect(0,height-100,width,100);

  // Title
  fill(0);
  textSize(55);
  text("💎",width/2,120);

  textSize(42);
  text("BEAD CATCHER",width/2,200);

  textSize(32);
  text("DELUXE",width/2,245);

  // Play Button
  rectMode(CENTER);      // <-- ADD THIS
  fill(255);
  stroke(0);
  strokeWeight(3);

  rect(
      width/2,
      380,
      220,
      70,
      20
  );

  noStroke();

  fill(0);
  textSize(32);
  text("PLAY",width/2,380);

  textSize(22);
  text("🏆 High Score: " + highScore,width/2,500);

  textSize(18);
  text("Move your mouse to catch gems!",width/2,550);

}

// =============================
// GAME
// =============================
function playGame(){

  
  background(180,230,255);

// =======================
// PARTICLES
// =======================

for(let i = particles.length-1; i>=0; i--){

  let p = particles[i];

  push();

  fill(255,255,0);

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

  if(p.life<=0){

    particles.splice(i,1);

  }

}

 

  // Ground
rectMode(CORNER);

fill(50,120,50);
rect(0, height-100, width, 100);
  // basket movement
  basketX = mouseX;

  basketX = constrain(
    basketX,
    basketWidth/2,
    width-basketWidth/2
  );

// =======================
// BASKET
// =======================

rectMode(CENTER);

// Shadow
fill(90, 55, 20);

rect(
  basketX,
  height - 54,
  basketWidth + 10,
  basketHeight + 8,
  10
);

// Basket
fill(181, 101, 29);

rect(
  basketX,
  height - 60,
  basketWidth,
  basketHeight,
  10
);

// Basket Rim
stroke(120, 70, 20);
strokeWeight(3);

line(
  basketX - basketWidth/2,
  height - 72,
  basketX + basketWidth/2,
  height - 72
);

// Basket Weaving
stroke(155, 90, 30);
strokeWeight(1);


  for(let x = -basketWidth/2+5; x <= basketWidth/2-5; x += 10){

  line(
    basketX + x,
    height - 70,
    basketX + x,
    height - 50
  );

}

noStroke();

beadY += beadSpeed;


// =======================
// GEM
// =======================

push();

translate(beadX, beadY);

// Outer gem

fill(gemColor);

stroke(255);
strokeWeight(2);

beginShape();

vertex(0,-18);
vertex(15,-5);
vertex(10,15);
vertex(0,22);
vertex(-10,15);
vertex(-15,-5);

endShape(CLOSE);

// Facets
stroke(220);

line(0,-18,0,22);
line(-15,-5,15,-5);
line(-10,15,10,15);
line(-15,-5,0,22);
line(15,-5,0,22);

// Sparkle
noStroke();

fill(255);

ellipse(-4,-8,4);
ellipse(5,-2,3);

pop();
  

 
// catch
if(
  beadY > height-75 &&
  beadY < height-45 &&
  beadX > basketX-basketWidth/2 &&
  beadX < basketX+basketWidth/2
){

  score += gemPoints;

  createSparkles(
    beadX,
    beadY
  );

  beadSpeed += 0.15;

  resetBead();

}

  // miss
  if(beadY > height){

    lives--;

    resetBead();

  }


  // UI

  fill(0);

  textSize(28);

  text(
    "Score: "+score,
    width/2,
    35
  );


  textSize(24);

  text(
    "❤️ ".repeat(lives),
    width/2,
    80
  );


  if(lives <=0){

    if(score > highScore){

      highScore = score;

      localStorage.setItem(
        "beadHighScore",
        highScore
      );

    }

    gameState="gameover";

  }

}


// =============================
// GAME OVER
// =============================
function drawGameOver(){

  background(30);


  fill(255);

  textSize(55);

  text(
    "GAME OVER",
    width/2,
    200
  );


  textSize(30);

  text(
    "Score: "+score,
    width/2,
    290
  );


  text(
    "🏆 Best: "+highScore,
    width/2,
    340
  );


  fill(255);

  rectMode(CENTER);

  rect(
    width/2,
    450,
    250,
    70,
    20
  );


  fill(0);

  textSize(28);

  text(
    "PLAY AGAIN",
    width/2,
    450
  );

}


// =============================
// MOUSE CLICK
// =============================
function mousePressed(){

  // PLAY BUTTON
  if(gameState==="menu"){

    if(
      mouseX>width/2-110 &&
      mouseX<width/2+110 &&
      mouseY>345 &&
      mouseY<415
    ){

      startGame();

    }

  }


  // RESTART BUTTON
  else if(gameState==="gameover"){

    if(
      mouseX>width/2-125 &&
      mouseX<width/2+125 &&
      mouseY>415 &&
      mouseY<485
    ){

      startGame();

    }

  }

}


// =============================
// START GAME
// =============================
function startGame(){

  score=0;

  lives=5;

  beadSpeed=4;

  resetBead();

  gameState="playing";

}


// =============================
// RESET BEAD
// =============================

function resetBead(){

  beadX = random(40, width - 40);
  beadY = -20;

  let r = random();

  if(r < 0.50){

    gemColor = color(0,180,255);   // Blue
    gemPoints = 1;

  }
  else if(r < 0.75){

    gemColor = color(0,220,120);   // Green
    gemPoints = 2;

  }
  else if(r < 0.90){

    gemColor = color(255,60,60);   // Red
    gemPoints = 3;

  }
  else if(r < 0.98){

    gemColor = color(255,210,0);   // Gold
    gemPoints = 5;

  }
  else{

    gemColor = color(255);         // Diamond
    gemPoints = 10;

  }

}






function createSparkles(x, y){

    
  for(let i = 0; i < 18; i++)
    
      particles.push({

      x: x,
      y: y,

      vx: random(-3,3),
      vy: random(-3,3),

      size: random(4,8),
      
      life: 45

    });

 

}
