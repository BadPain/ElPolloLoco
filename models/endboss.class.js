class Endboss extends MovableObject {

    y = 50;
    height = 400;
    width = 300;

    IMAGES_WALKING = [
        'img/main/4_enemie_boss_chicken/2_alert/G5.png',
        'img/main/4_enemie_boss_chicken/2_alert/G6.png',
        'img/main/4_enemie_boss_chicken/2_alert/G7.png',
        'img/main/4_enemie_boss_chicken/2_alert/G8.png',
        'img/main/4_enemie_boss_chicken/2_alert/G9.png',
        'img/main/4_enemie_boss_chicken/2_alert/G10.png',
        'img/main/4_enemie_boss_chicken/2_alert/G11.png',
        'img/main/4_enemie_boss_chicken/2_alert/G12.png',
    ];

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.x = 3800;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 200);
    }




}