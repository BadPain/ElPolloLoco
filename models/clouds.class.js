class Cloud extends MovableObject {


    constructor() {
        super().loadImage('img/main/5_background/layers/4_clouds/1.png');
        this.x = 0 + Math.random() * 500;
        this.y = 0 + Math.random() * 50;
        this.width = 500;
        this.height = 150;
    }
}