class Character extends MovableObject {

    y = 280;
    width = 90;
    height = 150;

    IMAGES_WALKING = [
        'img/main/2_character_pepe/2_walk/W-21.png',
        'img/main/2_character_pepe/2_walk/W-22.png',
        'img/main/2_character_pepe/2_walk/W-23.png',
        'img/main/2_character_pepe/2_walk/W-24.png',
        'img/main/2_character_pepe/2_walk/W-25.png',
        'img/main/2_character_pepe/2_walk/W-26.png'
    ];

    currentImage = 0;

    constructor() {
        super().loadImage('img/main/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
    }

    animate() {
        setInterval(() => {
            let i = this.currentImage % this.IMAGES_WALKING.length;
            let path = this.IMAGES_WALKING[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 1000 / 10);
    }

    jump() {
        console.log('jump');
    }
}