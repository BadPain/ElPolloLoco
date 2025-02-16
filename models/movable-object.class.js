class MovableObject {
    x = 120;   // Wie weit!
    y = 400;    // Wie hoch!
    img;       // Bild
    height = 150; // Höhe
    width = 100; // Breite


    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    moveRight() {
        console.log('move right');
    }


    moveLeft() {
        console.log('move left');
    }
}


