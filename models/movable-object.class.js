class MovableObject {
    x = 120;   // Wie weit!
    y = 330;    // Wie hoch!
    img;       // Bild
    height = 150; // Höhe
    width = 100; // Breite
    imageCache = {};
    currentImage = 0;
    speed = 0.2;

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

    moveRight() {
        console.log('move right');
    }




    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);
    }
}


