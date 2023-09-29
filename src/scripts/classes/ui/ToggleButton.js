import { emitter, G } from "../../..";
import Align from "../../lib/utils/Align";

export default class ToggleClass extends Phaser.GameObjects.Container {
	constructor(params) {
		super(params.scene);
		this.scene = params.scene;

		this.back = this.scene.add.image(0, 0, params.backKey);
		this.onIcon = this.scene.add.image(0, 0, params.onIcon);
		this.offIcon = this.scene.add.image(0, 0, params.offIcon);

		Align.scaleToGameW(this.back, 0.1);
		Align.scaleToGameW(this.onIcon, 0.05);
		Align.scaleToGameW(this.offIcon, 0.05);

		this.add([this.back, this.onIcon, this.offIcon]);

		if (!params.value) {
			params.value = true;
		}

		if (params.event) {
			this.event = params.event;
		}

		if (params.x) {
			this.x = params.x;
		}
		if (params.y) {
			this.y = params.y;
		}

		this.value = params.value;

		this.setIcons();

		this.back.setInteractive();
		this.back.on('pointerdown', this.toggle, this);

		this.setSize(this.back.displayWidth, this.back.displayHeight);
		this.scene.add.existing(this);
	}

	toggle() {
		if (!this.scene.sound.locked) {
			this.value = !this.value;
			this.setIcons();
			if (this.event) {
				emitter.emit(this.event, this.value);
			}
		}

	}

	setIcons() {
		if (this.value) {
			this.onIcon.visible = true;
			this.offIcon.visible = false;
		} else {
			this.onIcon.visible = false;
			this.offIcon.visible = true;
		}
	}
}