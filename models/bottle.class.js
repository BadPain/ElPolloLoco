class Bottles extends MovableObject {
    height = 50;
    width = 50;

    offset = {
        top: 5,
        right: 15,
        bottom: 5,
        left: 15
    }

    constructor() {
        super().loadImage('./img/main/7_statusbars/3_icons/icon_salsa_bottle.png');
        this.x = 0 + Math.random() * 500;
    }
}   