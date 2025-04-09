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

    /**
     * Constructor for the CoinBar class.
     * Initializes the coin bar with its images, position, dimensions, and initial percentage.
     * Loads the images for the coin bar and sets the initial position on the canvas.
     * Sets the initial total and collected coins for the bar.
     */
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

    /**
     * Sets the percentage of the coin bar based on the number of coins collected and the total number of coins.
     * Updates the image of the coin bar accordingly.
     * @param {number} collectedCoins - The number of coins collected.
     * @param {number} totalCoins - The total number of coins.
     */
    setPercentage(collectedCoins, totalCoins) {
        this.collectedCoins = collectedCoins;
        this.totalCoins = totalCoins;
        this.percentage = (this.collectedCoins / this.totalCoins) * 100;
        let path = this.IMAGES[this.pickUpCoin()];
        this.img = this.imageCache[path];
    }

    /**
     * Returns the index of the coin bar image based on the percentage of coins collected.
     * The index is calculated by dividing the percentage by 20 and rounding down to the nearest whole number.
     * @returns {number} The index of the coin bar image corresponding to the percentage of coins collected.
     */
    pickUpCoin() {
        return Math.floor(this.percentage / 20);
    }
}