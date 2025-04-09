/**
 * Checks if the user is currently in portrait mode and displays a warning
 * if this is the case. If the user is in landscape mode, the warning is
 * hidden and the game UI is displayed.
 * @function checkOrientation
 * @since 0.1.0
 */
function checkOrientation() {
    const isPortrait = window.innerHeight > window.innerWidth;
    const warning = document.getElementById('swapYourPhone');

    if (isPortrait) {
        warning.style.display = 'flex';
        document.getElementById('startScreen').style.display = 'none';
        document.getElementById('panel').style.display = 'none';
    } else {
        warning.style.display = 'none';
        document.getElementById('startScreen').style.display = 'flex';
        document.getElementById('panel').style.display = 'flex';
    }
}

window.addEventListener('load', checkOrientation);
window.addEventListener('resize', checkOrientation);
window.addEventListener('orientationchange', checkOrientation);