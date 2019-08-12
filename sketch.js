let world;

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    world = new Backdrop(color(20, 20, 20), 100, 10);
    console.log(world);
}

/*
    The draw function is executed once per frame.
*/
function draw() {
    // Update
    world.update();
    // Render
    world.render();
}


let state = false;
function mouseClicked() {
    if (state)
        noLoop();
    else
        loop();
    state = !state;
}
