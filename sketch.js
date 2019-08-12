let world;
let player;
let GAMEOVER = false;

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    world = new Backdrop(color(20, 20, 20), 5, 10);
    player = new Ship(100, 100, world);
}

/*
    The draw function is executed once per frame.
*/
function draw() {
    // Update
    world.update();
    player.update();
    // Render
    world.render();
    player.render();

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
