class ThrowableObject extends MovableObject {


    constructor(x, y) {
        super().loadImage('img/main/6_salsa_bottle/salsa_bottle.png');
        this.x = x;
        this.y = y;
        this.width = 60;
        this.height = 50;
        this.trow();
    }

    trow() {
        this.speedY = 10;
        this.applyGravity();
        setInterval(() => {
            this.x += 10;
        }, 25);
    }
}