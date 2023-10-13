//devolper flags
const AUTOMATION_ON = true;

let x;
let y;
let xSpeed = 0;
let ySpeed = 0;
let hitboxRadius = 25;
let isFullscreen = false;
let squares = [];
let squareSize = 20;
let spawnInterval = 1000;
let lastSpawn = 0;
let hearts = [1, 1, 1];
let invincibilityFrames = 0;
let flickerFrames = 0;
let gameOver = false;
let startTime;
let gameDuration;
let restartButton;

// set up the neural network
if (AUTOMATION_ON) {
  //TODO neral network
}
function setup() {
  createCanvas(500, 500);
  x = 250;
  y = 250;
  startTime = millis();
  restartButton = createButton("Restart");
  restartButton.position(width / 2 - restartButton.width / 2, height / 2 + 50);
  restartButton.mousePressed(resetGame);
  restartButton.hide();
}

function draw() {
  if (gameOver) {
    background(255);
    fill(0);
    textSize(30);
    textAlign(CENTER, CENTER);
    text("Game Over", width / 2, height / 2 - 50);
    text("You lasted: " + gameDuration + " seconds", width / 2, height / 2);
    restartButton.show();
    noLoop();
    x = constrain(x, hitboxRadius, width - hitboxRadius);
    y = constrain(y, hitboxRadius, height - hitboxRadius);
  } else {
    background(255);
    if (flickerFrames > 0) {
      if (frameCount % 2 === 0) {
        fill(255, 0, 0);
        ellipse(x, y, 50, 50);
      }
      flickerFrames--;
    } else {
      fill(255, 0, 0);
      ellipse(x, y, 50, 50);
    }
    x += xSpeed;
    y += ySpeed;

    if (x > width - hitboxRadius || x < hitboxRadius) {
      xSpeed = 0;
    }
    if (y > height - hitboxRadius || y < hitboxRadius) {
      ySpeed = 0;
    }

    if (millis() - lastSpawn > spawnInterval) {
      let x = random(0, width - squareSize);
      let y = random(0, height - squareSize);
      let square = new Square(x, y);
      squares.push(square);
      lastSpawn = millis();
    }

    for (let i = 0; i < squares.length; i++) {
      let square = squares[i];
      square.update();
      square.draw();
      let distance = dist(x, y, square.x + squareSize / 2, square.y + squareSize / 2);
      if (distance < hitboxRadius + squareSize / 2) {
        if (invincibilityFrames <= 0 && !square.flicker) {
          if (hearts.length > 0) {
            hearts.pop();
            flickerFrames = 90;
            invincibilityFrames = 90;
          } else {
            gameOver = true;
            gameDuration = round(((millis() - startTime) / 1000) * 100) / 100;
          }
        }
      }
    }

    if (invincibilityFrames > 0) {
      invincibilityFrames--;
    }

    for (let i = 0; i < hearts.length; i++) {
      let x = 20 + i * 40;
      let y = 20;
      fill(255, 0, 0);
      noStroke();
      ellipse(x, y, 20, 20);
    }
  }
}

function keyPressed() {
  if (AUTOMATION_ON === true)
    return;
  if (keyCode === LEFT_ARROW) {
    xSpeed = -5;
  } else if (keyCode === RIGHT_ARROW) {
    xSpeed = 5;
  } else if (keyCode === UP_ARROW) {
    ySpeed = -5;
  } else if (keyCode === DOWN_ARROW) {
    ySpeed = 5;
  }
  if (key === '/') {
    if (!isFullscreen) {
      let canvas = document.getElementsByTagName('canvas')[0];
      canvas.requestFullscreen();
      isFullscreen = true;
    } else {
      document.exitFullscreen();
      isFullscreen = false;
    }
  }
}

function keyReleased() {
  if (AUTOMATION_ON === true)
    return;
  if (keyCode === LEFT_ARROW) {
    xSpeed = 0;
  } else if (keyCode === RIGHT_ARROW) {
    xSpeed = 0;
  } else if (keyCode === UP_ARROW) {
    ySpeed = 0;
  } else if (keyCode === DOWN_ARROW) {
    ySpeed = 0;
  }
}

function resetGame() {
  gameOver = false;
  x = 250;
  y = 250;
  xSpeed = 0;
  ySpeed = 0;
  squares = [];
  lastSpawn = 0;
  hearts = [1, 1, 1];
  invincibilityFrames = 0;
  flickerFrames = 0;
  restartButton.hide();
  startTime = millis();
  loop();
}

class Square {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = squareSize;
    this.speedX = random(-2, 2);
    this.speedY = random(-2, 2);
    this.flicker = true;
    this.flickerStart = frameCount;
    this.spawnTime = millis();
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    // use the neural network to control the square 
    if(AUTOMATION_ON) {
      // TODO control the square
    }
    if (this.x < 0 || this.x > width - this.size) {
      this.speedX = -this.speedX;
    }
    if (this.y < 0 || this.y > height - this.size) {
      this.speedY = -this.speedY;
    }
    if (this.flicker && frameCount - this.flickerStart > 30) {
      this.flicker = false;
    }
  }

  draw() {
    if (this.flicker) {
      if (frameCount % 2 === 0) {
        fill(255, 0, 0);
        rect(this.x, this.y, this.size, this.size);
      } else {
        noFill();
        rect(this.x, this.y, this.size, this.size);
      }
    } else {
      fill(255, 0, 0);
      rect(this.x, this.y, this.size, this.size);
    }
  }
}

