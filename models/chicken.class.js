class Chicken extends MovableObject {

    constructor() {
        super().loadImage('img/main/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.x = 220 + Math.random() * 500;
        this.y = 400;
        this.width = 50;
        this.height = 50;
    }

}