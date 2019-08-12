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
        this.trailCD = 5;
        this.z = 0;
    }

    update() {
        this.trailCD--;
        if (this.trail.length > 4) {
            this.trail.splice(0, 1);
        }


        if (this.parent == null && this.trailCD <= 0) {
            this.trailCD = 5;
            this.trail.push(new Star(this.x, this.y, this.w * 0.7, this.env));
            this.trail[this.trail.length - 1].parent = true;
            this.trail[this.trail.length - 1].color = color(255, 0, 0);
            this.trail[this.trail.length - 1].velocity = createVector(0, 0);
        }

        for (let i = 0; i < this.trail.length; i++) {
            this.trail[i].update();
            this.trail[i].w *= 0.9;
        }

        this.z += 2;
        this.x -= this.velocity.x >> 1;
        this.y += this.velocity.y;
        this.velocity.y += this.env.gravity;
    }

    render() {
        //this.color.levels[3] = ;
        fill(this.color.levels[0], this.color.levels[1], this.color.levels[2], constrain(this.z, 0, 255));
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
        this.starCount = starCount;
        for (let i = 0; i < starCount; i++) {
            this.stars.push(new Star(random(width / 3, width), random(0, height - height / 4), random(10, 15), this));

        }
        this.gravity = 0.01;
    }

    update() {
        for (let i = this.stars.length - 1; i >= 0; i--) {
            this.stars[i].update();
        //    console.log(this.stars[i].velocity.y);
            if (this.stars[i].x < 20 || this.stars[i].y >= height + 20) {
                this.stars.splice(i, 1);
            }
        }
        for (let i = this.stars.length; i <= this.starCount; i++) {
            this.stars.push(new Star(random(width / 3, width), random(0, height - height / 4), random(10, 15), this));
        }
        console.log(this.stars[0].color);
    }

    render() {
        background(this.color);
        for (let i = 0; i < this.stars.length; i++) {
            this.stars[i].render();
        }
    }
}
