class SmallChicken extends MovableObject {
    y = 380
    width = 50
    height = 50
    offset = {
        top: 0,
        right: 0,
        bottom: 50,
        left: 0
    }

    IMAGES_WALKING = [
        'img/main/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/main/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/main/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ]

    IMAGES_DEAD = [
        'img/main/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ]

    /**
     * Constructor for SmallChicken objects.
     * Initializes the SmallChicken with a random x position between 1750 and 3500,
     * and a random speed between 0.15 and 0.65.
     * Loads the walking animations for the chicken.
     * Sets the initial state of the chicken to be not dead.
     * Calls the animate function to start animating the chicken.
     */
    constructor() {
        super().loadImage('img/main/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        let minLeftBoundary = 1750;
        let maxRightBoundary = 3500;
        this.x = minLeftBoundary + Math.random() * (maxRightBoundary - minLeftBoundary);
        this.speed = 0.15 + Math.random() * 0.5;
        this.animate();
        this.isDead = false;
    }

    /**
     * Initiates the animation intervals for the small chicken.
     * The small chicken moves left and plays walking animations at specified intervals,
     * unless the small chicken is dead or has moved beyond the left boundary.
     */
    animate() {
        this.moveInterval = setTrackedInterval(() => {
            if (!this.isDead && this.x > -1000) {
                this.moveLeft();
            }
        }, 1000 / 60, 'small chicken movement');

        this.walkInterval = setTrackedInterval(() => {
            if (!this.isDead && this.x > -1000) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 200, 'small chicken walking');
    }
}