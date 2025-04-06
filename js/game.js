let canvas;
let world;
let keyboard = new Keyboard();
let intervalIds = [];
let timeoutIds = [];
window.backgroundMusic = new Audio('audio/backgroundmusic.mp3');
window.backgroundMusic.volume = 0.0; // Testzwecke
// window.backgroundMusic.volume = 0.1;
window.backgroundMusic.loop = true;

function toStartAGame() {
    console.log(document.getElementById("panelMain", 'StartParameter'));
    // document.getElementById("startButton").style.display = "none";
    // document.getElementById("startScreen").style.display = "none";
    document.getElementById("canvas").style.display = "block";
    document.getElementById("closeControls").style.display = "none";
    document.getElementById("controls").style.display = "block";
    document.getElementById("panelMain").style.display = "flex";
    displayNoneStart();
    playBackgroundMusic();
    init();
}

function toRestartAGame() {
    console.log('--- GAME RESTART ---');
    document.getElementById("canvas").getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    document.getElementById("toWinAGame").style.display = "none";
    document.getElementById("toLoseAGame").style.display = "none";
    document.getElementById("restartButton").style.display = "none";
    if (world && world.boss) {
        world.boss.reset();
    }
    keyboard.reset();
    world = null;
    console.log(world);
    displayNoneStart();
    playBackgroundMusic();
    init();
    
}

function stopAllIntervals() {
    console.log('stopAllIntervals game.js');
    let highestIntervalId = setInterval(() => { }, 1000);
    for (let i = 0; i < highestIntervalId; i++) {
        clearInterval(i);
    }
}

function displayNoneStart() {
    document.getElementById("startButton").style.display = "none";
    document.getElementById("controlsButton").style.display = "none";
    document.getElementById("startImage").style.display = "none";
}

function init() {
    console.log('init() called!');
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
}

function closeControls() {
    document.getElementById("startScreen").style.display = "flex";
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



// function setGlobalInterval(fn, time) {
//     const id = setInterval(fn, time);
//     intervalIds.push(id);
//     return id;
// }

// function setGlobalTimeout(fn, time) {
//     const id = setTimeout(fn, time);
//     timeoutIds.push(id);
//     return id;
// }

// function clearAllTimers() {
//     intervalIds.forEach(clearInterval);
//     timeoutIds.forEach(clearTimeout);
//     intervalIds = [];
//     timeoutIds = [];
//     console.log('Alle Intervalle und Timeouts wurden gecleared.');
// }