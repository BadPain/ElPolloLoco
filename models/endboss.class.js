class Endboss extends MovableObject {

    y = 50;
    height = 400;
    width = 300;

    // offset = {
    //     top: 100,
    //     bottom: 0,
    //     left: 50,
    //     right: 50
    // }

    IMAGES_WALKING = [
        'img/main/4_enemie_boss_chicken/1_walk/G1.png',
        'img/main/4_enemie_boss_chicken/1_walk/G2.png',
        'img/main/4_enemie_boss_chicken/1_walk/G3.png',
        'img/main/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    IMAGES_ALERT = [
        'img/main/4_enemie_boss_chicken/2_alert/G5.png',
        'img/main/4_enemie_boss_chicken/2_alert/G6.png',
        'img/main/4_enemie_boss_chicken/2_alert/G7.png',
        'img/main/4_enemie_boss_chicken/2_alert/G8.png',
        'img/main/4_enemie_boss_chicken/2_alert/G9.png',
        'img/main/4_enemie_boss_chicken/2_alert/G10.png',
        'img/main/4_enemie_boss_chicken/2_alert/G11.png',
        'img/main/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_ATTACK = [
        'img/main/4_enemie_boss_chicken/3_attack/G13.png',
        'img/main/4_enemie_boss_chicken/3_attack/G14.png',
        'img/main/4_enemie_boss_chicken/3_attack/G15.png',
        'img/main/4_enemie_boss_chicken/3_attack/G16.png',
        'img/main/4_enemie_boss_chicken/3_attack/G17.png',
        'img/main/4_enemie_boss_chicken/3_attack/G18.png',
        'img/main/4_enemie_boss_chicken/3_attack/G19.png',
        'img/main/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    IMAGES_HURT = [
        'img/main/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/main/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/main/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    IMAGES_DEAD = [
        'img/main/4_enemie_boss_chicken/5_dead/G24.png',
        'img/main/4_enemie_boss_chicken/5_dead/G25.png',
        'img/main/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    IMAGES_GAMEOVER = [
        'img/main/9_intro_outro_screens/game_over/game over.png'
    ];

    constructor() {
        super().loadImage('img/main/4_enemie_boss_chicken/1_walk/G2.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 3000;
        this.energy = 100;
        this.lastHit = 0;
        this.speed = 20;
        this.isBossActivated = false;
        this.isDead = false;
        this.hasWon = false;
        this.bossIsWalking = false;
        this.alertPlayed = false;
    }

    reset() {
        this.x = 3000;
        this.y = 50;
        this.energy = 100;
        this.lastHit = 0;
        this.isDead = false;
        this.hasWon = false;
        this.bossIsWalking = false;
        this.alertPlayed = false;
    }

    takeDamage(amount) {
        this.energy -= amount;
        this.lastHit = new Date().getTime();
    }

    animate() {
        setInterval(() => this.handleMovementBoss(), 250);
        setInterval(() => this.handleAnimationBoss(), 250);
        this.isBossActivated = true;
        console.log(this.isBossActivated, 'isBossActivated');

    }

    handleMovementBoss() {
        if (this.isBossActivated && this.bossIsWalking) {
            this.alertPlayed = true
            this.playAnimation(this.IMAGES_WALKING);
            this.moveLeft();
        }
    }

    handleAnimationBoss() {
        if (this.isDead && this.energy == 0 && !this.hasWon) {
            this.hasWon = true;
            this.playAnimation(this.IMAGES_DEAD);
            setTimeout(() => {
                world.toWinAGame();
                world.stopAllIntervals();
            }, 1000);
        } else if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT);
        } else if (this.isBossActivated && Math.abs(this.x - world.character.x) < 150 && this.bossIsWalking) {
            setInterval(() => {
                this.isAttacking = true;
                this.bossIsWalking = false;
                this.playAnimation(this.IMAGES_ATTACK);
                console.log('Boss is attacking');
            }, 500);
            this.bossIsWalking = true;
            this.isAttacking = false;
        } else if (this.isBossActivated && Math.abs(this.x - world.character.x) < 200 && !this.isAttacking) {
            this.bossIsWalking = true;
            console.log('Boss is walking');
        } else if (this.isBossActivated && this.x - world.character.x < 500 && !this.bossIsWalking && !this.alertPlayed) {
            this.playAnimation(this.IMAGES_ALERT);
            console.log('Boss is alert');
        }
    }
}