class CoinBar extends DrawableObject {
    IMAGES = [
        'img/main/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        'img/main/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'img/main/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'img/main/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'img/main/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'img/main/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png'
    ];

    percentage = 0;

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 50;
        this.y = 70;
        this.width = 200;
        this.height = 50;
        this.setPercentage(0, 5);
        this.totalCoins = 5;
        this.collectedCoins = 0;
    }

    setPercentage(collectedCoins, totalCoins) {
        this.collectedCoins = collectedCoins;
        this.totalCoins = totalCoins;
        this.percentage = (this.collectedCoins / this.totalCoins) * 100;
        let path = this.IMAGES[this.pickUpCoin()];
        this.img = this.imageCache[path];
    }

    pickUpCoin() {
        return Math.floor(this.percentage / 20);
    }
}