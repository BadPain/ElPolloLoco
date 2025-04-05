class Character extends MovableObject {
    y = 200;
    speed = 10;
    width = 90;
    height = 150;
    speedY = 0;

    offset = {
        top: 60,
        right: 20,
        bottom: 0,
        left: 20
    }

    IMAGES_WALKING = [
        'img/main/2_character_pepe/2_walk/W-21.png',
        'img/main/2_character_pepe/2_walk/W-22.png',
        'img/main/2_character_pepe/2_walk/W-23.png',
        'img/main/2_character_pepe/2_walk/W-24.png',
        'img/main/2_character_pepe/2_walk/W-25.png',
        'img/main/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMPING = [
        'img/main/2_character_pepe/3_jump/J-31.png',
        'img/main/2_character_pepe/3_jump/J-32.png',
        'img/main/2_character_pepe/3_jump/J-33.png',
        'img/main/2_character_pepe/3_jump/J-34.png',
        'img/main/2_character_pepe/3_jump/J-35.png',
        'img/main/2_character_pepe/3_jump/J-36.png',
        'img/main/2_character_pepe/3_jump/J-37.png',
        'img/main/2_character_pepe/3_jump/J-38.png',
        'img/main/2_character_pepe/3_jump/J-39.png'
    ];

    IMAGES_DEAD = [
        'img/main/2_character_pepe/5_dead/D-51.png',
        'img/main/2_character_pepe/5_dead/D-52.png',
        'img/main/2_character_pepe/5_dead/D-53.png',
        'img/main/2_character_pepe/5_dead/D-54.png',
        'img/main/2_character_pepe/5_dead/D-55.png',
        'img/main/2_character_pepe/5_dead/D-56.png',
        'img/main/2_character_pepe/5_dead/D-57.png'
    ];

    IMAGES_HURT = [
        'img/main/2_character_pepe/4_hurt/H-41.png',
        'img/main/2_character_pepe/4_hurt/H-42.png',
        'img/main/2_character_pepe/4_hurt/H-43.png'
    ];

    IMAGES_IDLE = [
        'img/main/2_character_pepe/1_idle/idle/I-1.png',
        'img/main/2_character_pepe/1_idle/idle/I-2.png',
        'img/main/2_character_pepe/1_idle/idle/I-3.png',
        'img/main/2_character_pepe/1_idle/idle/I-4.png',
        'img/main/2_character_pepe/1_idle/idle/I-5.png',
        'img/main/2_character_pepe/1_idle/idle/I-6.png',
        'img/main/2_character_pepe/1_idle/idle/I-7.png',
        'img/main/2_character_pepe/1_idle/idle/I-8.png',
        'img/main/2_character_pepe/1_idle/idle/I-9.png',
        'img/main/2_character_pepe/1_idle/idle/I-10.png'
    ]

    IMAGES_LONGIDLE = [
        'img/main/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/main/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/main/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/main/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/main/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/main/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/main/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/main/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/main/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/main/2_character_pepe/1_idle/long_idle/I-20.png'
    ]

    world;

    constructor() {
        super().loadImage('img/main/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONGIDLE);
        this.applyGravity();
        this.walking_sound = new Audio('audio/walk_new3.mp3');
        this.jumping_sound = new Audio('audio/jipii3.mp3');
        this.walking_sound.volume = 0.0; // Testzwecke
        this.jumping_sound.volume = 0.0; // Testzwecke
        // this.walking_sound.volume = 0.3;
        // this.jumping_sound.volume = 0.1;
        this.animate();
        this.isFallingDown();
        this.idleTime = 0;
        this.energy = 100000;
    }

    animate() {
        setInterval(() => this.handleMovement(), 1000 / 60);
        setInterval(() => this.handleAnimation(), 100);
    }

    handleMovement() {
        this.walking_sound.pause();
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.moveRight();
            this.otherDirection = false;
            this.walking_sound.play();
        }
        if (this.world.keyboard.LEFT && this.x > -1000) {
            this.moveLeft();
            this.otherDirection = true;
            this.walking_sound.play();
        }
        if (this.world.keyboard.SPACE && !this.isAboveGround()) {
            this.jump();
            this.jumping_sound.play();
        }
        this.world.camera_x = -this.x + 100;
    }

    handleAnimation() {
        if (this.hasLose) return;

        if (this.isDead()) {
            this.hasLose = true;
            this.playAnimation(this.IMAGES_DEAD);
            setTimeout(() => {
                this.world.toLoseAGame();
                this.world.stopAllIntervals();
            }, 1000);
            this.idleTime = 0;
        } else if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT);
            this.idleTime = 0;
        } else if (this.isAboveGround()) {
            this.playAnimation(this.IMAGES_JUMPING);
            if (this.currentImage >= 3 && this.speedY > 0) {
                this.currentImage = 3;
            }
            this.idleTime = 0;
        } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            this.playAnimation(this.IMAGES_WALKING);
            this.idleTime = 0;
        } else if (this.isOnGround()) {
            this.idleTime += 100;
            if (this.idleTime >= 10000) {
                this.playAnimation(this.IMAGES_LONGIDLE, 10);
            } else {
                this.playAnimation(this.IMAGES_IDLE);
            }
        }
    }
}