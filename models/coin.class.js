class Coin extends MovableObject {
    
    // y = 300;
    height = 50;
    width = 50;

    constructor() {
        super().loadImage('img/main/7_statusbars/3_icons/icon_coin.png');
        this.x = 0 + Math.random() * 500;
    }
}   