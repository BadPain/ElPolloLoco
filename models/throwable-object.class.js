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

    /**
     * Constructor for the ThrowableObject class.
     * @param {number} x - The x-coordinate of the object.
     * @param {number} y - The y-coordinate of the object.
     */
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

    /**
     * Throws the bottle by setting the vertical speed to -10 and setting the interval to apply gravity.
     * Also sets the interval to move the bottle to the right and down every 25 milliseconds.
     * The bottle is set to be thrown by setting the isThrown property to true.
     */
    throw() {
        this.isThrown = true;
        this.speedY = -10;
        this.applyGravity();
        setTrackedInterval(() => {
            this.x += 5;
            this.y += this.speedY;
            this.speedY -= 2;
        }, 25, 'ThrowInterval');
    }

    /**
     * Plays the bottle throw animation by setting an interval to play the images in the IMAGES_BOTTLE array.
     * The interval is set to 50 milliseconds and is labeled as 'bottleThrowInterval'.
     * The bottle is set to be thrown by setting the isThrown property to true.
     */
    bottleThrow() {
        if (this.isThrown = true) {
            setTrackedInterval(() => {
                this.playAnimation(this.IMAGES_BOTTLE);
            }, 50, 'bottleThrowInterval');
        }
    }

    /**
     * Plays the bottle splash animation and removes the bottle from the game.
     * If isThrow is true, the animation is played and the bottle is removed after 250 milliseconds.
     * If isThrow is false, the bottle is removed if it is below the ground.
     * @param {boolean} isThrow - Whether the bottle was thrown or not.
     */
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

    /**
     * Removes the bottle from the game by splicing it out of the array of throwable objects.
     * This method is called when the bottle has hit a chicken or fallen to the ground and is no longer needed in the game.
     */
    removeObjectFromGame() {
        world.throwableObjects.forEach(bottleRemove => {
            world.throwableObjects.splice(world.throwableObjects.indexOf(bottleRemove), 1);
        });
    }
}