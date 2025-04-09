document.addEventListener('DOMContentLoaded', () => {
    bindBtsPressEvents();
  });

/**
 * Binds touchstart and touchend events to the mobile controls buttons.
 * The associated keyboard values are set to true on touchstart and false on touchend.
 * This allows the mobile controls to work the same way as the keyboard controls.
 * @function
 */
function bindBtsPressEvents(){
    const btnLeft = document.getElementById('btnLeft');
    const btnRight = document.getElementById('btnRight');
    const btnJump = document.getElementById('btnJump');
    const btnThrow = document.getElementById('btnThrow');

    btnLeft.addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.LEFT = true;
    });
    btnLeft.addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
    });
    btnRight.addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.RIGHT = true;
    });
    btnRight.addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.RIGHT = false;
    });
    btnJump.addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.SPACE = true;
    });
    btnJump.addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.SPACE = false;
    } );
    btnThrow.addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.D = true;
    });
    btnThrow.addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.D = false;
    });
}

/**
 * Handles player movement and jumping on smartphones.
 * This function is called in the requestAnimationFrame loop.
 * @function smartphoneControls
 * @since 0.1.0
 * @private
 */
function smartphoneControls() {
    if (keyboard.RIGHT) {
        world.character.moveRight();
    }
    if (keyboard.LEFT) {
        world.character.moveLeft();
    }
    if (keyboard.SPACE) {
        world.character.jump();
    }
    if (keyboard.D) {
        world.character.checkThrowObjects();
    }
}