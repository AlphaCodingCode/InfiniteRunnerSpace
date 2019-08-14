let world;
let player;
let meteors = [];
let enemies = [];
let enemySpawnCD = 50;
let GAMEOVER = false;
let score = 0;
let timeScore = 0;

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    world = new Backdrop(color(20, 20, 20), 5, 10);
    player = new Ship(world);
    meteors.push(new Meteor(width + 300, random(height / 4, 3 * height / 4), random(60, 160), world));
    meteors.push(new Meteor(width + 900, random(height / 4, 3 * height / 4), random(60, 160), world));
}

/*
    The draw function is executed once per frame.
*/
function draw() {
    // Update
    world.update();
    player.update();
    for (let i = enemies.length - 1; i >= 0; i--) {
        enemies[i].update();
        if (enemies[i].destroyed) {
            score += 30;
            enemies.splice(i, 1);
        } else if (enemies[i].x < - 40) {
            enemies.splice(i, 1);
        } else if (enemies[i].crashed) {
            GAMEOVER = true;
        }
    }
    for (let i = meteors.length - 1; i >= 0; i--) {
        meteors[i].update();
        if (meteors[i].x < 0 - meteors[i].size) {
            meteors.push(new Meteor(width + random(180, 350), random(height / 4, 3 * height / 4), random(60, 160), world));
            meteors.splice(i, 1);
        }
    }
    // spawn a new enemy every 40 frames
    enemySpawnCD--;
    if (enemySpawnCD <= 0) {
        enemySpawnCD = 50;
        enemies.push(new Enemy(width - 30, random(height / 4, 3 * height / 4), world));
    }

    // gain score over time
    timeScore++;
    if (timeScore % 60)
        score++;

    // Render
    world.render();
    player.render();
    for (let i = meteors.length - 1; i >= 0; i--) {
        meteors[i].render();
    }
    for (let i = 0; i < enemies.length; i++) {
        enemies[i].render();
    }

    fill(255);
    textAlign(LEFT);
    textSize(40);
    strokeWeight(2);
    text("Score: " + score, 30, height - 40);

    if (GAMEOVER) {
        gameOver();
        noLoop();
    }
}


let state = false;
function mouseClicked() {
    if (state)
        noLoop();
    else
        loop();
    state = !state;
}


function gameOver() {
    fill(0);
    stroke(255);
    rectMode(CENTER);
    rect(width / 2, height / 2 + 15, 400, 160);
    fill(255);
    noStroke();
    textAlign(CENTER);
    textSize(50);
    text("GAME OVER!", width / 2, height / 2);
    text("Score: " + score, width / 2, height / 2 + 60);
}
