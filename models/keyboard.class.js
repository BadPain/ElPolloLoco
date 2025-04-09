class Keyboard {
    LEFT = false;
    RIGHT = false;
    UP = false;
    DOWN = false;
    SPACE = false;
    D = false;
    ESCAPE = false;

    /**
     * Resets all keyboard input flags to their default state (false).
     * This is typically used to clear any active inputs when restarting the game
     * or when the input state needs to be reset.
     */
    reset() {
        this.LEFT = false;
        this.RIGHT = false;
        this.UP = false;
        this.DOWN = false;
        this.SPACE = false;
        this.D = false;
        this.ESC = false;
    }
}