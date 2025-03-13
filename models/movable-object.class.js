class MovableObject {
    x = 120;   // Wie weit!
    y = 330;    // Wie hoch!
    img;       // Bild
    height = 150; // Höhe
    width = 100; // Breite
    imageCache = {};
    currentImage = 0;
    speed = 0.2;
    otherDirection = false;
    speedY = 0;
    acceleration = 1;


    applyGravity() {
        setInterval(() => {
            if (this.y < 330) {
            this.y -= this.speedY;
            this.speedY -= this.acceleration;
        }
        }, 1000 / 25);
    }

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    playAnimation(images) {
        let i = this.currentImage % this.IMAGES_WALKING.length;
        let path = this.IMAGES_WALKING[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveRight() {
        console.log('move right');
    }

    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);
    }
}


