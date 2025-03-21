class Chicken extends MovableObject {


    y = 380;
    width = 50;
    height = 50; 


    IMAGES_WALKING = [
        'img/main/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/main/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/main/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ]

    offset = {
        top: 0,
        bottom: 50,
        left: 0,
        right: 0
    }


    constructor() {
        super().loadImage('img/main/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.x = 220 + Math.random() * 500;
        this.speed = 0.15 + Math.random() * 0.5;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 200);
        
    }

}