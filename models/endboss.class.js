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

    constructor() {
        super().loadImage('img/main/4_enemie_boss_chicken/1_walk/G2.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 3000;
        this.animate();
        this.energy = 100;
        this.lastHit = 0;
        this.speed = 0.4;
        this.isActive = false;
    }

    playAnimation(images) {
        if (!images || images.length === 0) return;
        if (this.animationCounter === undefined) {
            this.animationCounter = 0;
        }
        let animationSpeed = 5;
        if (this.animationCounter % animationSpeed === 0) {
            let i = this.currentImage % images.length;
            let path = images[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }
        this.animationCounter++;
    }

    playAnimationOnce(images, callback) {
        if (!images || images.length === 0) return;
    
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
    
        if (this.currentImage < images.length - 1) {
            this.currentImage++;
        } else {
            this.currentImage = 0;
            if (callback) callback();
        }
    }

    // playAnimation(images) {
    //     if (!images || images.length === 0) return;
    
    //     this.animationSpeed = 5;
    //     let i = this.currentImage % images.length;
    //     let path = images[i];
    
    //     if (this.imageCache[path]) {
    //         this.img = this.imageCache[path];
    //     } else {
    //         console.warn("Bild nicht gefunden:", path);
    //     }
    
    //     this.currentImage++;
    // }

    // playAnimation(images) {
    //     (images.length > 0)
    //     let i = this.currentImage % images.length;
    //     let path = images[i];
    //     this.img = this.imageCache[path];
    //     this.currentImage++;
    //     this.animationSpeed = 1;
    // }

    isDead() {
        return this.energy == 0;
    }

    isHurtBoss() {
        this.playAnimationOnce(this.IMAGES_HURT, () => {
            this.playAnimation(this.IMAGES_WALK);
        });
    }

    hit() {
        this.energy -= 20;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    moveLeft() {
        console.log("Boss bewegt sich!");
        this.x -= this.speed;
    }

    takeDamage(amount) {
        this.energy -= amount;
        this.lastHit = new Date().getTime();
    }

    animate() {
        setInterval(() => {
            if (!this.isDead) {
                this.moveLeft(); 
                this.playAnimation(this.IMAGES_WALK);
            }
        }, 1000 / 60);
    }

    // animate() {
    //     setInterval(() => {
    //         if (this.isActive && this.x > -1000) {
    //             this.beginAnimation();
    //             this.moveLeft();
    //             // console.log('New settings are ok!');
    //         }
    //     }, 200);
    // }

    beginAnimation() {
        if (this.isDead()) {
            this.playAnimation(this.IMAGES_DEAD);
            this.idleTime = 0;
        } else if (this.isHurtBoss()) {
            this.playAnimation(this.IMAGES_HURT);
            this.idleTime = 0;
        } else if (this.isActive) {
            console.log("Boss läuft → Animation aktiv!");
            this.playAnimation(this.IMAGES_WALKING);
            this.moveLeft();
            this.idleTime = 0;
        }
    }
}