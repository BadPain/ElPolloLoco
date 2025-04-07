let canvas;
let world;
let keyboard = new Keyboard();
const globalIntervals = [];
const globalTimeouts = [];


window.backgroundMusic = new Audio('audio/backgroundmusic.mp3');
window.backgroundMusic.volume = 0.0; // Testzwecke
// window.backgroundMusic.volume = 0.1;
window.backgroundMusic.loop = true;

function toStartAGame() {
    document.getElementById("canvas").style.display = "block";
    document.getElementById("closeControls").style.display = "none";
    document.getElementById("controls").style.display = "block";
    document.getElementById("panelMain").style.display = "flex";
    displayNoneStart();
    playBackgroundMusic();
    init();
}

function toRestartAGame() {
    document.getElementById("toWinAGame").style.display = "none";
    document.getElementById("toLoseAGame").style.display = "none";
    document.getElementById("restartButton").style.display = "none";
    if (world && world.boss) {
        world.boss.reset();
    }
    keyboard.reset();
    stopAllIntervals();
    world = null;
    displayNoneStart();
    playBackgroundMusic();
    init();
}

function stopAllIntervals() {
    clearAllTrackedTimers()
}

function displayNoneStart() {
    document.getElementById("startButton").style.display = "none";
    document.getElementById("controlsButton").style.display = "none";
    document.getElementById("startImage").style.display = "none";
}

function init() {
    initLevel1();
    canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard);
    console.log('My Character is', world.character);
}

function playBackgroundMusic() {
    window.backgroundMusic.play();
}

function viewControls() {
    document.getElementById("startScreen").style.display = "none";
    document.getElementById("footer").style.display = "block";
}

function closeControls() {
    document.getElementById("startScreen").style.display = "flex";
    document.getElementById("footer").style.display = "none";
}

function fullscreen() {
    if (document.fullscreenElement) {
        document.exitFullscreen();
        document.getElementById("fullscreen").style.backgroundImage = "url('img/vollbild.png')";
    } else {
        document.getElementById("container").requestFullscreen();
        document.getElementById("fullscreen").style.backgroundImage = "url('img/minimieren.png')";
    }
}

function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    }
}

function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}

let soundMuted = false;

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

function setTrackedInterval(fn, time, description = '') {
    const id = setInterval(fn, time);
    globalIntervals.push({ id, description });
    // console.log(`[Interval gestartet] ID: ${id}, Beschreibung: ${description}`);
    return id;
}

function setTrackedTimeout(fn, time, description = '') {
    const id = setTimeout(fn, time);
    globalTimeouts.push({ id, description });
    // console.log(`[Timeout gestartet] ID: ${id}, Beschreibung: ${description}`);
    return id;
}

function clearAllTrackedTimers() {
    globalIntervals.forEach(timer => {
        clearInterval(timer.id);
        // console.log(`[Interval gestoppt] ID: ${timer.id}, Beschreibung: ${timer.description}`);
    });
    globalTimeouts.forEach(timer => {
        clearTimeout(timer.id);
        // console.log(`[Timeout gestoppt] ID: ${timer.id}, Beschreibung: ${timer.description}`);
    });
    globalIntervals.length = 0;
    globalTimeouts.length = 0;
}