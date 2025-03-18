class Character extends MovableObject {

    y = 200;
    speed = 10;
    width = 90;
    height = 150;


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

    world;
    walking_sound = new Audio('audio/walk_new3.mp3');
    jumping_sound = new Audio('audio/Jipii.mp3');

    constructor() {
        super().loadImage('img/main/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.applyGravity();
        this.walking_sound.volume = 0.3;
        this.jumping_sound.volume = 0.1;
        this.animate();
    }

    animate() {
        setInterval(() => {
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
            } else if(this.world.keyboard.SPACE && this.isJumping()) {
                this.stopJump();
                this.isJumping = false;
            }
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);


        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
            } else {
                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                    this.playAnimation(this.IMAGES_WALKING);
                }
            }
        }, 50);
    }


}


