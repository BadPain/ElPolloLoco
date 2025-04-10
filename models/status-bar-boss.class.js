class BossBar extends DrawableObject {
    IMAGES = [
        'img/main/7_statusbars/2_statusbar_endboss/green/green100.png',
        'img/main/7_statusbars/2_statusbar_endboss/green/green80.png',
        'img/main/7_statusbars/2_statusbar_endboss/blue/blue60.png',
        'img/main/7_statusbars/2_statusbar_endboss/blue/blue40.png',
        'img/main/7_statusbars/2_statusbar_endboss/orange/orange20.png',
        'img/main/7_statusbars/2_statusbar_endboss/orange/orange0.png'
    ];

    percentage = 0;

    constructor() {
        super();
        this.loadImages(this.IMAGES)
        this.x = 475;
        this.y = 20;
        this.width = 200;
        this.height = 50;
        this.setPercentage(100);
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path]
    }

    resolveImageIndex() {
        if (this.percentage == 100) {
            return 0;
        } else if (this.percentage >= 80) {
            return 1;
        } else if (this.percentage >= 60) {
            return 2;
        } else if (this.percentage >= 40) {
            return 3;
        } else if (this.percentage >= 20) {
            return 4;
        } else {
            return 5;
        }
    }
}