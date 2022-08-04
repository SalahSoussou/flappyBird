let obstaclesArray = [];

function init() {
    bird = new Bird();
    particlesArray = [];
    obstaclesArray = [];
    handleObstacles();
    score = 0;
    gamespeed = 2;
    long = 100;
}

class Obstacle {
    constructor() {
        this.top = (Math.random() * canvas.height/3) + 20;
        this.bottom = (Math.random() * canvas.height/3) + 20;
        this.x = canvas.width;
        this.width = 20;
        this.color = 'hsl(' + hue +',' + '100%, 50%, 1)';
        this.counted = false;
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, 0, this.width, this.top);
        ctx.fillRect(this.x, canvas.height - this.bottom, this.width, this.bottom);
    }
    update() {
        this.x -= gamespeed;
        if(!this.counted && this.x < bird.x) {
            score++;
            this.counted = true;
        }
        this.draw();
    }
};
let long = 100;
function handleObstacles() {
    if( score > 5) {
        long = 30;
        gamespeed = 4
    }  
    if( score > 10) {
        long = 20;
        gamespeed = 6
    }
    if (frame%long === 0) {
        obstaclesArray.unshift(new Obstacle);
    }
    for (let i = 0; i < obstaclesArray.length; i++) {
        obstaclesArray[i].update();
    }
    if (obstaclesArray.length > 20) {
        obstaclesArray.pop(obstaclesArray[0])
    }
}