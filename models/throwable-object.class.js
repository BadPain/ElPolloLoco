class ThrowableObject extends MovableObject {

    IMAGES_BOTTLE = [
        'img/main/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/main/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/main/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/main/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];


    constructor(x, y) {
        super().loadImage('img/main/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES_BOTTLE);
        this.loadImage(this.IMAGES_BOTTLE[0]);
        this.x = x;
        this.y = y;
        this.width = 60;
        this.height = 50;
        this.throw();
        this.bottleThrow();
    }

    throw() {
        this.isThrown = true;
        this.speedY = 10;
        this.applyGravity();
        setInterval(() => {
            this.x += 10;
        }, 25);
    }

    bottleThrow() {
        setInterval(() => {
            if (this.isThrown = true) {
                this.playAnimation(this.IMAGES_BOTTLE);
            }
        }, 50);
    }
}