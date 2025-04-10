class Endboss extends MovableObject {
    y = 50;
    height = 400;
    width = 300;

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
        this.x = 4000;
        this.energy = 100;
        this.lastHit = 0;
        this.speed = 20;
        this.isBossActivated = false;
        this.isDead = false;
        this.bossIsWalking = false;
        this.alertPlayed = false;
        this.isAttacking = false;
    }

    reset() {
        this.x = 4000;
        this.energy = 100;
        this.lastHit = 0;
        this.speed = 20;
        this.isBossActivated = false;
        this.isDead = false;
        this.hasWon = false;
        this.bossIsWalking = false;
        this.alertPlayed = false;
        this.isAttacking = false;
    }

    takeDamage(amount) {
        this.energy -= amount;
        this.lastHit = new Date().getTime();
    }

    hit() {
        this.takeDamage(20);
    }

    animate() {
        setTrackedInterval(() => {
            this.handleMovementBoss();
            this.checkAttackTrigger();
        }, 250, 'Boss Movement');
        setTrackedInterval(() => {
            this.handleAnimationBoss();
        }, 250, 'Boss Animation');
        this.isBossActivated = true;
    }

    handleMovementBoss() {
        if (this.isBossActivated && this.bossIsWalking) {
            this.alertPlayed = true
            this.playAnimation(this.IMAGES_WALKING);
            this.moveLeft();
        }
    }

    handleAnimationBoss() {
        if (this.bossIsDead()) return;
        if (this.bossIsHurt()) return;
        if (this.bossIsAttacking()) return;
        if (this.checkBossIsWalking()) return;
        this.bossIsAlert()

    }

    bossIsDead() {
        if (this.isDead && this.energy == 0) {
            this.isDead = true;
            this.isAttacking = false;
            this.bossIsWalking = false;
            this.playAnimation(this.IMAGES_DEAD);
            setTrackedTimeout(() => {
                world.toWinAGame();
                gameIsRunning = false;
            }, 1000, 'Boss Died!');
            return true;
        }
        return false;
    }

    bossIsHurt() {
        if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT);
            return true;
        }
        return false;
    }

    bossIsAttacking() {
        if (this.isAttacking) {
            this.playAnimation(this.IMAGES_ATTACK);
            return true;
        }
        return false;
    }

    checkBossIsWalking() {
        if (this.isBossActivated && Math.abs(this.x - world.character.x) < 300 && !this.isAttacking) {
            this.bossIsWalking = true;
            this.playAnimation(this.IMAGES_WALKING);
            return true;
        }
        return false;
    }

    bossIsAlert() {
        if (this.isBossActivated && this.x - world.character.x < 500 && !this.bossIsWalking && !this.alertPlayed) {
            this.playAnimation(this.IMAGES_ALERT);
            return true;
        }
        return false;
    }

    checkAttackTrigger() {
        if (this.isBossActivated && (this.energy > 0) && !this.isAttacking && Math.abs(this.x - world.character.x) < 30) {
            this.isAttacking = true;
            this.bossIsWalking = false;
            setTrackedTimeout(() => {
                if ((this.energy > 0)) {
                    this.isAttacking = false;
                    this.bossIsWalking = true;
                    world.checkBossAttacking = false;
                }
            }, 5000, 'Boss finished attack');
        }
    }
}