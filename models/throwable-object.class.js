class ThrowableObject extends MovableObject {
    offset = {
        top: 5,
        right: 15,
        bottom: 5,
        left: 15
    }

    IMAGES_BOTTLE = [
        'img/main/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/main/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/main/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/main/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    IMAGES_SPLASH = [
        'img/main/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/main/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/main/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/main/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/main/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/main/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ];

    constructor(x, y) {
        super().loadImage('img/main/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES_BOTTLE);
        this.loadImage(this.IMAGES_BOTTLE[0]);
        this.loadImages(this.IMAGES_SPLASH);
        this.x = x;
        this.y = y;
        this.width = 60;
        this.height = 50;
        this.throw();
        this.bottleThrow();
    }

    throw() {
        this.isThrown = true;
        this.speedY = -10;
        this.applyGravity();
        setTrackedInterval(() => {
            this.x += 10;
            this.y += this.speedY;
            this.speedY -= 2.5;
        }, 25, 'ThrowInterval');
    }

    bottleThrow() {
        if (this.isThrown = true) {
            setTrackedInterval(() => {
                this.playAnimation(this.IMAGES_BOTTLE);
            }, 50, 'bottleThrowInterval');
        }
    }

    bottleSplash(isThrow) {
        if (isThrow) {
            setTrackedInterval(() => {
                this.playAnimation(this.IMAGES_SPLASH);
            }, 50);
            setTrackedTimeout(() => {
                this.removeObjectFromGame();
            }, 250, 'bottleSplash');
        } else {
            if (world.throwableObjects[0].y > 400) {
                this.removeObjectFromGame();
            }
        }
    }

    removeObjectFromGame() {
        world.throwableObjects.forEach(bottleRemove => {
            world.throwableObjects.splice(world.throwableObjects.indexOf(bottleRemove), 1);
        });
    }
}