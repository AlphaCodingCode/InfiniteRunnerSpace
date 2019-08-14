class Ship {
    constructor(env) {
        this.x = 200;
        this.y = height / 2;
        this.env = env;
        this.accY = 0;
        this.velocityY = 0;
        this.cooldown = 20;
        this.bullets = [];
    }

    weaponSystems() {
        this.cooldown--;
        if ((keys[keyX] || keys[SPACE]) && this.cooldown <= 0) {
            // fire a bullet
            this.bullets.push({x : this.x + 20, y : this.y + 20});
            this.cooldown = 20;
        }

        for (let i = this.bullets.length - 1; i >= 0; i--) {
            // bullet out of bounds
            if (this.bullets[i].x > width) {
                this.bullets.splice(i, 1);
            } else {
                // move bullet
                this.bullets[i].x += 10;

                // check if bullet has collided with a meteor
                for (let j = 0; j < meteors.length; j++) {
                    if (collideCirclePoly(this.bullets[i].x, this.bullets[i].y, 52, meteors[j].canvasVertices)) {
                        this.bullets.splice(i, 1);
                        break;
                    }
                }
            }
        }
    }

    update() {
        // movement
        if (keys[UP_ARROW] || keys[keyW]) {
            this.accY = 0;
            this.accY -= 0.5;
        } else if (keys[DOWN_ARROW] || keys[keyS]) {
            this.accY = 0;
            this.accY += 0.5;
        } else {
            // cruise
            this.accY *= 0.9;
            this.velocityY *= 0.9;
        }
        this.y += this.velocityY;
        this.accY += this.env.gravity;
        this.accY *= 0.9;
        this.velocityY += this.accY;
        this.velocityY = constrain(this.velocityY, -8, 8);

        // weapons
        this.weaponSystems();
        // check if player has collided with a meteor
        for (let j = 0; j < meteors.length; j++) {
            if (collideCirclePoly(this.x + 10, this.y + 25, 70, meteors[j].canvasVertices, true)) {
                GAMEOVER = true;
                return;
            }
        }

        // collision with walls
        let topWallPoints = [];
        let botWallPoints = [];

        // get the points perpindicular to the ship's hitbox
        for (let i = this.x - 25; i < this.x + 45; i++) {
            let y1 = noise(this.env.xOff + (0.01 * i)) * this.env.weight;
            let y2 = noise(this.env.xOff + (0.01 * i) + 10000) * this.env.weight;
            topWallPoints.push({x : i, y : y2});
            botWallPoints.push({x : i, y : y1 + 3 * height / 4});
        }

        // collision with walls
        for (let i = 0; i < topWallPoints.length; i++) {
            if (dist(this.x + 10, this.y + 25, topWallPoints[i].x, topWallPoints[i].y) <= 35) {
                GAMEOVER = true;
                return;
            } else if (dist(this.x + 10, this.y + 25, botWallPoints[i].x, botWallPoints[i].y) <= 35) {
                GAMEOVER = true;
                return;
            }
        }
    }

    drawShip() {
        let x = this.x;
        let y = this.y;

        // front
        noStroke(200, 200, 200);
        fill(255);
        beginShape();
        vertex(x, y);
        vertex(x + 40, y + 15);
        vertex(x + 40, y + 35);
        vertex(x, y + 50);
        endShape(CLOSE);

        // back
        fill(50, 50, 100);
        beginShape();
        vertex(x - 6, y);
        vertex(x - 16, y + 15);
        vertex(x - 16, y + 35);
        vertex(x - 6, y + 50);
        endShape(CLOSE);

        // outline
        noFill();
        stroke(255, 255, 255);
        strokeWeight(5);
        beginShape();
        vertex(x, y - 7);
        vertex(x + 47, y + 10);
        vertex(x + 47, y + 40);
        vertex(x, y + 57);
        vertex(x - 23, y + 40);
        vertex(x - 23, y + 10);
        endShape(CLOSE);

        // tail flame
        stroke(200, 0, 0);
        let randFlame = random();
        fill(200, 200, 0);
        beginShape();
        vertex(x - 28, y + 12);
        vertex(x - 28 - random(20, 30), y + 24);
        vertex(x - 28, y + 35);
        endShape();

        noStroke();
        textSize(12);
        textAlign(CENTER);
        fill(100, 0, 0);
        text("NASA", x + 20, y + 27);
    }

    render() {
        stroke(255);
        strokeWeight(3);
        for (let i = 0; i < this.bullets.length; i++) {
            noFill();
            ellipse(this.bullets[i].x, this.bullets[i].y, 5, 5);
        }
        this.drawShip(this.x, this.y);

        // let topWallPoints = [];
        // let botWallPoints = [];
        // for (let i = this.x - 25; i < this.x + 45; i++) {
        //     let y1 = noise(this.env.xOff + (0.01 * i)) * this.env.weight;
        //     let y2 = noise(this.env.xOff + (0.01 * i) + 10000) * this.env.weight;
        //     topWallPoints.push({x : i, y : y2});
        //     botWallPoints.push({x : i, y : y1 + 3 * height / 4});
        // }
        //
        // console.log(topWallPoints.length, botWallPoints.length);
        // stroke(0, 200, 0);
        // strokeWeight(10);
        // for (let i = 0; i < topWallPoints.length; i++) {
        //     point(topWallPoints[i].x, topWallPoints[i].y);
        //     point(botWallPoints[i].x, botWallPoints[i].y);
        //     if (dist(this.x + 10, this.y + 25, topWallPoints[i].x, topWallPoints[i].y) <= 35) {
        //          stroke(0, 0, 255);
        //          point(topWallPoints[i].x, topWallPoints[i].y);
        //          return;
        //     } else if (dist(this.x + 10, this.y + 25, botWallPoints[i].x, botWallPoints[i].y) <= 35) {
        //         stroke(0, 0, 255);
        //         point(botWallPoints[i].x, botWallPoints[i].y);
        //         return;
        //     }
        // }
    }




}
