class Chicken extends MovableObject {

    constructor() {
        super().loadImage('img/main/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.x = 220 + Math.random() * 500;
        this.y = 380;
        this.width = 50;
        this.height = 50;
        this.image = [
            'img/main/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
            'img/main/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
            'img/main/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
        ]
        this.currentImageIndex = 0;

        this.animate();
    }

    animate() {
        setInterval(() => {
            this.x -= 0.5;
            this.changeImage();
        }, 1000 / 60);
    }

    changeImage() {
        this.currentImageIndex = (this.currentImageIndex + 1) % this.image.length;
        this.img = new Image();
        this.img.src = this.image[this.currentImageIndex];
    }
}