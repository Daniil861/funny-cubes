import ToggleClass from "./ToggleButton";
import { G, config, model } from "../../..";

export default class SoundButton extends Phaser.GameObjects.Container {
	constructor(params) {
		super(params.scene);
		this.scene = params.scene;
		this.status = params.status;

		if (this.status === 1) {
			this.createMusicButton();
			this.add([this.musicButton]);

			this.setCoordinatesMusicButton();
		} else {
			this.createSfxButton();
			this.createMusicButton();

			this.add([this.musicButton, this.sfxButton]);

			this.setCoordinatesMusicButton();
			this.setCoordinatesSfxButton()
		}

		if (!model.musicOn && this.musicButton) {
			this.musicButton.toggle();
		}
		if (!model.soundOn && this.sfxButton) {
			this.sfxButton.toggle();
		}

		this.scene.add.existing(this);
	}

	createMusicButton() {
		this.musicButton = new ToggleClass({
			scene: this.scene,
			backKey: 'toggleBack',
			onIcon: 'musicOn',
			offIcon: 'musicOff',
			event: G.TOGGLE_MUSIC,
		})
	}

	createSfxButton() {
		this.sfxButton = new ToggleClass({
			scene: this.scene,
			backKey: 'toggleBack',
			onIcon: 'sfxOn',
			offIcon: 'sfxOff',
			event: G.TOGGLE_SOUND,
		})
	}

	setCoordinatesMusicButton() {
		this.musicButton.x = this.musicButton.width / 2;
		this.musicButton.y = this.musicButton.height / 2;
		this.musicButton.setScrollFactor(0);
	}
	setCoordinatesSfxButton() {
		this.sfxButton.x = this.musicButton.width / 2;
		this.sfxButton.y = this.musicButton.y + this.musicButton.height + 10;
		this.sfxButton.setScrollFactor(0);
	}
}