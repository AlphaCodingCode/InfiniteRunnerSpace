let world;
let player;
let meteors = [];
let GAMEOVER = false;

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

    for (let i = meteors.length - 1; i >= 0; i--) {
        meteors[i].update();
        if (meteors[i].x < 0 - meteors[i].size) {
            meteors.push(new Meteor(width + random(180, 350), random(height / 4, 3 * height / 4), random(60, 160), world));
            meteors.splice(i, 1);
        }
    }


    // Render
    world.render();
    player.render();
    for (let i = meteors.length - 1; i >= 0; i--) {
        meteors[i].render();
    }

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
    fill(255);
    textAlign(CENTER);
    textSize(50);
    text("GAME OVER!", width / 2, height / 2);
}
