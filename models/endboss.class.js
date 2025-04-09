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

    /**
     * Constructor for the Endboss class.
     * Initializes the Endboss with its images, position, and attributes.
     * Loads the walking, alert, attack, hurt, and dead images for animations.
     * Sets the initial position and state variables for the Endboss including energy, speed, and status flags.
     */
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
        this.bossIsWalking = false;
        this.alertPlayed = false;
        this.isAttacking = false;
    }

    /**
     * Resets the Endboss to its initial state.
     * Resets the position, energy, speed, and status flags for the Endboss.
     * This is called when the game is restarted.
     */
    reset() {
        this.x = 3000;
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

    /**
     * Reduces the Endboss's energy by the given amount and updates the last hit time.
     * This is called when the Endboss is hit by a bottle.
     * @param {number} amount - The amount of energy to subtract from the Endboss's energy.
     */
    takeDamage(amount) {
        this.energy -= amount;
        this.lastHit = new Date().getTime();
    }

    /**
     * Animates the Endboss by calling the handleMovementBoss and checkAttackTrigger methods.
     * Also starts the boss animation and sets the boss to be activated.
     */
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

    /**
     * Handles the Endboss's movement.
     * If the boss is activated and should be walking, it plays the walking animation and moves left.
     * The alertPlayed flag is set to true to prevent the alert animation from being played again.
     */
    handleMovementBoss() {
        if (this.isBossActivated && this.bossIsWalking) {
            this.alertPlayed = true
            this.playAnimation(this.IMAGES_WALKING);
            this.moveLeft();
        }
    }

    /**
     * Handles the Endboss's animations.
     * If the boss is dead, it plays the death animation and triggers the win game screen.
     * If the boss is hurt, it plays the hurt animation.
     * If the boss is attacking, it plays the attack animation.
     * If the boss is activated and the character is within 300 pixels from the boss, it starts walking.
     * If the boss is activated and the character is within 500 pixels from the boss but the boss is not walking and the alert animation has not been played yet, it plays the alert animation.
     */
    handleAnimationBoss() {
        if (this.isDead && this.energy == 0) {
            this.isDead = true;
            this.isAttacking = false;
            this.bossIsWalking = false;
            this.playAnimation(this.IMAGES_DEAD);
            setTrackedTimeout(() => {
                world.toWinAGame();
                gameIsRunning = false;
            }, 1000, 'Boss Died!');
        } else if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT);
        } else if (this.isAttacking) {
            this.playAnimation(this.IMAGES_ATTACK);
        } else if (this.isBossActivated && Math.abs(this.x - world.character.x) < 300 && !this.isAttacking) {
            this.bossIsWalking = true;
            this.playAnimation(this.IMAGES_WALKING);
        } else if (this.isBossActivated && this.x - world.character.x < 500 && !this.bossIsWalking && !this.alertPlayed) {
            this.playAnimation(this.IMAGES_ALERT);
        }
    }

    /**
     * Checks if the Endboss should attack the character.
     * If the conditions are met, it sets the isAttacking flag to true and stops the boss from walking.
     * Also sets a timeout to stop the attack animation after 5 seconds.
     */
    checkAttackTrigger() {
        if (this.isBossActivated && (this.energy > 0) && !this.isAttacking && Math.abs(this.x - world.character.x) < 150) {
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