class Chicken extends MovableObject {

    y = 380;
    width = 50;
    height = 50;
    offset = {
        top: 0,
        bottom: 50,
        left: 0,
        right: 0
    }

    IMAGES_WALKING = [
        'img/main/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/main/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/main/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ]

    IMAGES_DEAD = [
        'img/main/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ]

    constructor() {
        super().loadImage('img/main/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        let minLeftBoundary = 1750;
        let maxRightBoundary = 3500;
        this.x = minLeftBoundary + Math.random() * (maxRightBoundary - minLeftBoundary);
        this.speed = 0.15 + Math.random() * 0.5;
        this.animate();
        this.isDead = false;
    }

    animate() {
        this.moveInterval = setInterval(() => {
            if (!this.isDead && this.x > -1000) {
                this.moveLeft();
            }
        }, 1000 / 60);

        this.walkInterval = setInterval(() => {
            if (!this.isDead && this.x > -1000) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 200);
    }
}