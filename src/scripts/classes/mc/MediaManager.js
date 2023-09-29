import { emitter, G, model } from "../../..";
import { isMobile } from "../../lib/utils/Tools";

export default class MediaManager {
	constructor(params) {
		this.scene = params.scene;
		this.scene.sound.pauseOnBlur = false;

		emitter.on(G.PLAY_SOUND, this.playSound, this);
		emitter.on(G.MUSIC_CHANGED, this.musicChanged, this);
		emitter.on(G.BG_MUSIC_CHANGE, this.setBackgroundMusic, this);
		emitter.on(G.BG_MUSIC_STOP, this.stopBackgroundMusic, this);
	}

	musicChanged() {
		isMobile.iOS() ? this.scene.sound.unlock() : false;

		if (this.background) {

			if (!model.musicOn) {
				this.background.stop();
			} else {
				this.playMusic(this.background);
			}
		}
	}

	playSound(key, volume = 1) {

		isMobile.iOS() ? this.scene.sound.unlock() : false;

		if (model.soundOn) {
			const sound = this.scene.sound.add(key, { volume: volume });
			this.playMusic(sound);
		}

	}

	setBackgroundMusic(key) {
		isMobile.iOS() ? this.scene.sound.unlock() : false;

		this.background = this.scene.sound.add(key, { volume: 0.3, loop: true });
		if (model.musicOn) {
			this.playMusic(this.background);
		}
	}

	stopBackgroundMusic() {
		this.background.stop();
	}

	playMusic(music) {
		if (!isMobile.iOS()) { // Если любое устройство, кроме IOS - используем WebAudioApi
			music.play();
		} else { // Если устройство IOS - тогда используем HTML5Audio
			if (!this.scene.sound.locked) {
				music.play();
			} else {  // IF Not wait on unlock event 
				this.scene.sound.once(Phaser.Sound.Events.UNLOCKED, () => {
					music.play();
				})
			}
		}

	}
}