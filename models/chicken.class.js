class Chicken extends MovableObject {


    y = 380;
    width = 50;
    height = 50;
    IMAGES_WALKING = [
        'img/main/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/main/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/main/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ]


    constructor() {
        super().loadImage('img/main/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);

        this.x = 220 + Math.random() * 500;
        this.animate();
    }

    animate() {
        setInterval(() => {
            let i = this.currentImage % this.IMAGES_WALKING.length;
            let path = this.IMAGES_WALKING[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 200);
    }

    // animate() {
    //     setInterval(() => {
    //         this.x -= 0.5;
    //         this.changeImage();
    //     }, 1000 / 60);
    // }

    // changeImage() {
    //     this.currentImageIndex = (this.currentImageIndex + 1) % this.image.length;
    //     this.img = new Image();
    //     this.img.src = this.image[this.currentImageIndex];
    // }
}