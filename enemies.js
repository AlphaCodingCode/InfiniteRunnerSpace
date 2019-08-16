class Enemy {
    constructor(x, y, env) {
        this.x = x;
        this.y = y;
        this.env = env;
        this.accY = 0;
        this.velY = 0;
        this.destroyed = false;
        this.crashed = false;
        this.forwardSpeed = 2;
    }

    aiCrash() {
        // Tend towards the player
        if (player.y > this.y) {
            this.accY += 0.05;
        } else if (player.y < this.y) {
            this.accY -= 0.05;
        }
        this.accY += this.env.gravity;
    }

    update() {
        this.aiCrash();
        this.x -= this.env.scrollSpeed + this.forwardSpeed;
        this.velY += this.accY;
        this.y += this.velY;
        this.accY *= 0.6;
        // check if we collided with the player
        if (dist(player.x + 10, player.y + 25, this.x, this.y + 10) <= (35 + 35)) {
            // crashed
            this.crashed = true;
            return;
        }
        // if enemy collided with a bullet
        for (let i = 0; i < player.bullets.length; i++) {
            if (dist(this.x, this.y + 10, player.bullets[i].x, player.bullets[i].y) <= (35 + 4)) {
                this.destroyed = true;
            }
        }
    }

    render() {
        stroke(255, 255, 255);
        fill(100, 100, 100);
        ellipse(this.x, this.y + 15, 90, 30);
        noStroke();
        arc(this.x, this.y + 30, 40, 20, 0, Math.PI, PIE);
        stroke(255, 255, 255);
        fill(100, 200, 40);
        arc(this.x, this.y, 40, 40, Math.PI, 0, PIE);
        noFill();
        stroke(0);
        strokeWeight(8);
        arc(this.x, this.y, 80, 40, 0 + 0.26, Math.PI - 0.26, OPEN);
        strokeWeight(4);
        noStroke();

    }
}
