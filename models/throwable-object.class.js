class ThrowableObject extends MovableObject {

    IMAGES_BOTTLE = [
        'img/main/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/main/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/main/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/main/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    offset = {
        top: 5,
        bottom: 5,
        left: 15,
        right: 15
    }

    constructor(x, y) {
        super().loadImage('img/main/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES_BOTTLE);
        this.loadImage(this.IMAGES_BOTTLE[0]);
        this.x = x;
        this.y = y;
        this.width = 60;
        this.height = 50;
        this.throw();
        this.bottleThrow();
    }

    // throw(enemies = []) {
    //     this.isThrown = true;
    //     this.speedY = -10; // Anfangs schneller nach oben
    //     this.applyGravity();

    //     const move = () => {
    //         this.x += 5; // Bewege die Flasche nach vorne
    //         this.y += this.speedY;
    //         this.speedY += 0.5; // Simuliert die Schwerkraft

    //         // Prüfe, ob die Flasche mit einem Gegner kollidiert
    //         for (let enemy of enemies) {
    //             if (this.isColliding(obj)) {
    //                 console.log("Treffer!");
    //                 enemy.chickenDie(); // Füge eine Methode hinzu, um Gegner zu entfernen
    //                 return; // Stoppe die Bewegung der Flasche
    //             }
    //         }

    //         // Stoppe das Werfen, wenn die Flasche außerhalb des Bildschirms ist
    //         if (this.y > canvas.height) return;
    //         console.log(this.y);

    //         requestAnimationFrame(move);
    //     };

    //     move();
    // }

    throw() {
        this.isThrown = true;
        this.speedY = -10;
        this.applyGravity();
        setInterval(() => {
            this.x += 5;
            this.y += this.speedY;
            this.speedY -= 2;
            // this.x += 1;
            // this.y -= -1;
            // this.applyGravity();
            // console.log(this.y, 'Y');
            // console.log(this.speedY, 'Speed Y');
            // console.log(this.x, 'X');
        }, 25);
    }

    bottleThrow() {
        setInterval(() => {
            if (this.isThrown = true) {
                this.playAnimation(this.IMAGES_BOTTLE);
            }
        }, 50);
    }
}