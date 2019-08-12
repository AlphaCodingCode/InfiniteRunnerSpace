class Star {
    constructor(x, y, width, environment) {
        this.x = x;
        this.y = y;
        this.w = width;
        this.velocity = createVector(environment.scrollSpeed, 0.05);
        this.env = environment;
        this.color = color(random(200, 255), random(200, 255), 180);
        this.trail = [];
        this.parent = null;
        this.trailCD = 10;
    }

    update() {
        this.trailCD--;
        if (this.trail.length > 10) {
            this.trail.splice(0, 1);
        }

        for (let i = 0; i < this.trail.length; i++) {
            this.trail[i].update();
        }

        if (this.parent == null && this.trailCD <= 0) {
            this.trailCD = 10;
            this.trail.push(new Star(this.x, this.y, this.w * 0.7, this.env));
            this.trail[this.trail.length - 1].parent = true;
            this.trail[this.trail.length - 1].color = color(255, 0, 0);
            this.trail[this.trail.length - 1].velocity = createVector(this.velocity.x, this.velocity.y);
        }

        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.velocity.y += this.env.gravity;


    }

    render() {
        fill(this.color);
        ellipse(this.x, this.y, this.w, this.w);
        for (let i = 0; i < this.trail.length; i++) {
            ellipse(this.trail[i].x, this.trail[i].y, this.trail[i].w, this.trail[i].w);
        }
    }


}

class Backdrop {
    constructor(color, starCount, scrollSpeed) {
        this.color = color;
        this.scrollSpeed = scrollSpeed;
        this.stars = [];
        console.log(this);
        for (let i = 0; i < starCount; i++) {
            this.stars.push(new Star(random(0, width), random(0, height), random(10, 15), this));
        }
        this.gravity = 0.1;
    }

    update() {
        for (let i = 0; i < this.stars.length; i++) {
            this.stars[i].update();
        }
    }

    render() {
        background(this.color);
        for (let i = 0; i < this.stars.length; i++) {
            this.stars[i].render();
        }
    }
}
