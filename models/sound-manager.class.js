class SoundManager {
    constructor() {
        this.soundMuted = localStorage.getItem('soundMuted') === 'true';
        this.sounds = {
            background: this.createSound('audio/backgroundmusic.mp3', 0.2, true),
            jump: this.createSound('audio/jipii3.mp3', 0.1),
            walking: this.createSound('audio/walk_new3.mp3', 0.3),
        };
    }

    startBackgroundMusic() {
        let music = this.sounds.background.audio;
        music.loop = true;
        music.muted = this.soundMuted;
        music.play();
    }
    createSound(src, volume, loop = false) {
        let audio = new Audio(src);
        audio.volume = volume;
        audio.loop = loop;
        audio.muted = this.soundMuted;
        return { audio, volume };
    }

    play(name) {
        let entry = this.sounds[name];
        if (!entry) return;

        let clone = entry.audio.cloneNode();
        clone.volume = entry.volume;
        clone.muted = this.soundMuted;
        clone.play();
    }

    toggleMute() {
        this.soundMuted = !this.soundMuted;
        localStorage.setItem('soundMuted', this.soundMuted);
        this.updateMuteStatus();
    }

    updateMuteStatus() {
        for (let key in this.sounds) {
            this.sounds[key].audio.muted = this.soundMuted;
        }
    }

    isMuted() {
        return this.soundMuted;
    }
}
