class Coin extends MovableObject {
    height = 50;
    width = 50;

    offset = {
        top: 10,
        right: 10,
        bottom: 0,
        left: 10
    }

    constructor() {
        super().loadImage('img/main/7_statusbars/3_icons/icon_coin.png');
        this.x = 0 + Math.random() * 500;
    }
}   