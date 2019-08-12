class Meteor {
    constructor(x, y, size, env) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.env = env;

        this.velocity = createVector(-env.scrollSpeed, 0);
        
        /* Formula for a point in an ellipse where a and b are the width and height and a == b */
        // x = a * cos(θ)
        // y = b * sin(θ)
        let vertices = random(4, 15);
        this.vertices = [];
        for (let i = 0; i < vertices; i++) {
            let theta = ((2 * Math.PI) / vertices) * i;
            let randInfluence = random(-size / 2, size / 2);
            let x = (this.size + randInfluence) * Math.cos(theta);
            let y = (this.size + randInfluence) * Math.sin(theta);
            this.vertices.push({x : x, y : y, angle : theta, inf : randInfluence});
        }
    }

    update() {
        // update the meteor's position
        this.x += this.velocity.x;
        this.y += this.velocity.y;

        // spin meteor slowly
        for (let i = 0; i < this.vertices.length; i++) {
            let theta = this.vertices[i].angle += 0.01;
            let randInfluence = this.vertices[i].inf;
            let x = (this.size + randInfluence) * Math.cos(theta);
            let y = (this.size + randInfluence) * Math.sin(theta);
            this.vertices[i].x = x;
            this.vertices[i].y = y;
            this.vertices[i].angle = theta;
        }
    }

    render() {
        // render based on points
        noFill();
        stroke(255);
        fill(60, 60, 90);
        beginShape();
        for (let i = 0; i < this.vertices.length; i++) {
            vertex(this.vertices[i].x + this.x, this.vertices[i].y + this.y);
        }
        endShape(CLOSE);
    }

}
