class Character extends MovableObject {

    constructor() {
        super().loadImage('img/main/2_character_pepe/1_idle/idle/I-1.png');
        this.x = 50;
        this.y = 250;
        this.width = 150;
        this.height = 100;
    }

    jump() {
        console.log('jump');
    }
}