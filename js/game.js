let canvas;
let world;
let keyboard = new Keyboard();
gameIsRunning = true;
const globalIntervals = [];
const globalTimeouts = [];
window.soundManager = new SoundManager();

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
    if (world && world.wasSoundMutedByEndscreen) {
        window.soundManager.soundMuted = false;
        window.soundManager.updateMuteStatus();
    }
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
    document.getElementById("impressum").style.display = "none";
}

function init() {
    initSoundButton();
    window.soundManager.startBackgroundMusic();
    initLevel1();
    canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard);
    gameIsRunning = true;
}

function viewControls() {
    document.getElementById("startScreen").style.display = "none";
    document.getElementById("footer").style.display = "block";
    document.getElementById("muteMusicButton").style.display = "none";
    document.getElementById("fullscreen").style.display = "none";
}

function closeControls() {
    document.getElementById("startScreen").style.display = "flex";
    document.getElementById("footer").style.display = "none";
    document.getElementById("muteMusicButton").style.display = "flex";
    document.getElementById("fullscreen").style.display = "flex";
}

function viewImpressum() {
    document.getElementById("startScreen").style.display = "none";
    document.getElementById("muteMusicButton").style.display = "none";
    document.getElementById("fullscreen").style.display = "none";
    document.getElementById('title').style.display = "none";
    let container = document.getElementById("impressumScreen");
    container.classList.remove("hidden");
    container.innerHTML = impressumTemplate();
}

function closeImpressum() {
    let container = document.getElementById("impressumScreen");
    container.classList.add("hidden");
    container.innerHTML = "";
    document.getElementById("impressumScreen").classList.add("hidden");
    document.getElementById("startScreen").style.display = "flex";
    document.getElementById("muteMusicButton").style.display = "block";
    document.getElementById('title').style.display = "block";
    document.getElementById("fullscreen").style.display = "block";
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

function playBackgroundMusic() {
    if (gameIsRunning) {
        window.soundManager.startBackgroundMusic();
    }
}

function toggleMusic() {
    window.soundManager.toggleMute();

    const button = document.getElementById("muteMusicButton");

    if (window.soundManager.isMuted()) {
        button.style.backgroundImage = "url('img/stumm.png')";
    } else {
        const music = window.soundManager.sounds.background.audio;
        if (music.paused) {
            music.play();
        }
        button.style.backgroundImage = "url('img/laut.png')";
    }
}

function initSoundButton() {
    const isMuted = localStorage.getItem('soundMuted') === 'true';

    if (isMuted) {
        document.getElementById("muteMusicButton").style.backgroundImage = "url('img/stumm.png')";
    } else {
        document.getElementById("muteMusicButton").style.backgroundImage = "url('img/laut.png')";
    }
}

window.addEventListener("keydown", (e) => {
    if (e.keyCode == 39) { keyboard.RIGHT = true; }
    if (e.keyCode == 37) { keyboard.LEFT = true; }
    if (e.keyCode == 38) { keyboard.UP = true; }
    if (e.keyCode == 40) { keyboard.DOWN = true; }
    if (e.keyCode == 32) { keyboard.SPACE = true; }
    if (e.keyCode == 68) { keyboard.D = true; }
    if (e.keyCode == 27) { keyboard.ESCAPE = true; }
})

window.addEventListener("keyup", (e) => {
    if (e.keyCode == 39) { keyboard.RIGHT = false; }
    if (e.keyCode == 37) { keyboard.LEFT = false; }
    if (e.keyCode == 38) { keyboard.UP = false; }
    if (e.keyCode == 40) { keyboard.DOWN = false; }
    if (e.keyCode == 32) { keyboard.SPACE = false; }
    if (e.keyCode == 68) { keyboard.D = false; }
    if (e.keyCode == 27) { keyboard.ESCAPE = false; }
})

function setTrackedInterval(fn, time, description = '') {
    const id = setInterval(fn, time);
    globalIntervals.push({ id, description });
    return id;
}

function setTrackedTimeout(fn, time, description = '') {
    const id = setTimeout(fn, time);
    globalTimeouts.push({ id, description });
    return id;
}

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