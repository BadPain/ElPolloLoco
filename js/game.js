let canvas;
let world;
let keyboard = new Keyboard();
gameIsRunning = true;
const globalIntervals = [];
const globalTimeouts = [];

window.backgroundMusic = new Audio('audio/backgroundmusic.mp3');
window.backgroundMusic.volume = 0.1;
window.backgroundMusic.loop = true;

/**
 * Hides the start screen and shows the game area.
 * @function toStartAGame
 * @since 0.1.0
 */
function toStartAGame() {
    document.getElementById("canvas").style.display = "block";
    document.getElementById("closeControls").style.display = "none";
    document.getElementById("controls").style.display = "block";
    document.getElementById("panelMain").style.display = "flex";
    displayNoneStart();
    playBackgroundMusic();
    init();
}

/**
 * Resets the game to its initial state and restarts the game.
 * @function toRestartAGame
 * @since 0.1.0
 */
function toRestartAGame() {
    document.getElementById("toWinAGame").style.display = "none";
    document.getElementById("toLoseAGame").style.display = "none";
    document.getElementById("restartButton").style.display = "none";
    if (world && world.boss) {
        world.boss.reset();
    }
    keyboard.reset();
    stopAllIntervals();
    stopAllAnimations();
    world = null;
    displayNoneStart();
    playBackgroundMusic();
    init();
}

/**
 * Clears all tracked intervals and timeouts.
 * @function stopAllIntervals
 * @since 0.1.0
 */
function stopAllIntervals() {
    clearAllTrackedTimers()
}

/**
 * Hides all start-related UI elements.
 * @function displayNoneStart
 * @since 0.1.0
 */
function displayNoneStart() {
    document.getElementById("startButton").style.display = "none";
    document.getElementById("controlsButton").style.display = "none";
    document.getElementById("startImage").style.display = "none";
}

/**
 * Initializes the game by loading the level and creating a new game world.
 * @function init
 * @since 0.1.0
 */
function init() {
    initLevel1();
    canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard);
    console.log('My Character is', world.character);
}

/**
 * Starts playing the background music.
 * @function playBackgroundMusic
 * @since 0.1.0
 */
function playBackgroundMusic() {
    window.backgroundMusic.play();
}

/**
 * Shows the controls and hides the start screen.
 * @function viewControls
 * @since 0.1.0
 */
function viewControls() {
    document.getElementById("startScreen").style.display = "none";
    document.getElementById("footer").style.display = "block";
}

/**
 * Hides the controls and shows the start screen.
 * @function closeControls
 * @since 0.1.0
 */
function closeControls() {
    document.getElementById("startScreen").style.display = "flex";
    document.getElementById("footer").style.display = "none";
}

/**
 * Toggles the game canvas between windowed and full screen mode.
 * @function fullscreen
 * @since 0.1.0
 */
function fullscreen() {
    if (document.fullscreenElement) {
        document.exitFullscreen();
        document.getElementById("fullscreen").style.backgroundImage = "url('img/vollbild.png')";
    } else {
        document.getElementById("container").requestFullscreen();
        document.getElementById("fullscreen").style.backgroundImage = "url('img/minimieren.png')";
    }
}

/**
 * Requests to enter full screen mode for the given element.
 * @param {Element} element The element to enter full screen mode.
 * @since 0.1.0
 */
function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    }
}

/**
 * Exits full screen mode for the whole document.
 * @function exitFullscreen
 * @since 0.1.0
 */
function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}

let soundMuted = false;

/**
 * Toggles the game music between play and mute.
 * @function toggleMusic
 * @since 0.1.0
 */
function toggleMusic() {
    if (soundMuted) {
        play();
        document.getElementById("muteMusicButton").style.backgroundImage = "url('img/laut.png')";
    } else {
        mute();
        document.getElementById("muteMusicButton").style.backgroundImage = "url('img/stumm.png')";
    }
    soundMuted = !soundMuted;
}

/**
 * Mutes all sounds in the game.
 * @function mute
 * @since 0.1.0
 */
function mute() {
    if (!world.character) return;
    let sounds = [
        world.character.walking_sound,
        world.character.jumping_sound,
        window.backgroundMusic,
        document.getElementById("music")
    ];
    sounds.forEach(sound => {
        if (sound) sound.muted = true;
    });
}

/**
 * Unmutes all sounds in the game.
 * @function play
 * @since 0.1.0
 */
function play() {
    if (!world.character) return;
    let sounds = [
        world.character.walking_sound,
        world.character.jumping_sound,
        window.backgroundMusic,
        document.getElementById("music")
    ];
    sounds.forEach(sound => {
        if (sound) sound.muted = false;
    });
}

window.addEventListener("keydown", (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = true;
    }
    if (e.keyCode == 37) {
        keyboard.LEFT = true;
    }
    if (e.keyCode == 38) {
        keyboard.UP = true;
    }
    if (e.keyCode == 40) {
        keyboard.DOWN = true;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = true;
    }
    if (e.keyCode == 68) {
        keyboard.D = true;
    }
    if (e.keyCode == 27) {
        keyboard.ESCAPE = true;
    }
})

window.addEventListener("keyup", (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = false;
    }
    if (e.keyCode == 37) {
        keyboard.LEFT = false;
    }
    if (e.keyCode == 38) {
        keyboard.UP = false;
    }
    if (e.keyCode == 40) {
        keyboard.DOWN = false;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = false;
    }
    if (e.keyCode == 68) {
        keyboard.D = false;
    }
    if (e.keyCode == 27) {
        keyboard.ESCAPE = false;
    }
})

/**
 * Sets a tracked interval that repeatedly calls a function with a specified delay.
 * The interval is stored globally for future reference or clearing.
 * @function setTrackedInterval
 * @param {Function} fn - The function to be executed repeatedly.
 * @param {number} time - The interval time in milliseconds.
 * @param {string} [description=''] - An optional description for the interval.
 * @returns {number} The ID of the created interval.
 */
function setTrackedInterval(fn, time, description = '') {
    const id = setInterval(fn, time);
    globalIntervals.push({ id, description });
    return id;
}

/**
 * Sets a tracked timeout that calls a function once with a specified delay.
 * The timeout is stored globally for future reference or clearing.
 * @function setTrackedTimeout
 * @param {Function} fn - The function to be executed once.
 * @param {number} time - The delay time in milliseconds.
 * @param {string} [description=''] - An optional description for the timeout.
 * @returns {number} The ID of the created timeout.
 */
function setTrackedTimeout(fn, time, description = '') {
    const id = setTimeout(fn, time);
    globalTimeouts.push({ id, description });
    return id;
}

/**
 * Clears all tracked intervals and timeouts.
 * This function iterates over all stored interval and timeout IDs,
 * clears them using clearInterval and clearTimeout respectively,
 * and then resets the global storage arrays to an empty state.
 * It ensures that no pending intervals or timeouts remain active.
 * @function clearAllTrackedTimers
 * @since 0.1.0
 */
function clearAllTrackedTimers() {
    globalIntervals.forEach(timer => {
        clearInterval(timer.id);
    });
    globalTimeouts.forEach(timer => {
        clearTimeout(timer.id);
    });
    globalIntervals.length = 0;
    globalTimeouts.length = 0;
}