import { model, G, emitter } from '../../../../index.js';
import Align from '../../../lib/utils/Align.js';

export default class BonusGameItem extends Phaser.GameObjects.Container {
	constructor(params) {
		super(params.scene);
		this.scene = params.scene;
		this.texture = params.texture;
		this.count = params.count;

		this.animate = false;

		this.constY = 0;

		const snowBack = this.scene.add.image(0, 0, 'toggleBack');
		Align.scaleToGameW(snowBack, 0.1);

		const iconSnow = this.scene.add.image(0, 0, this.texture);
		Align.scaleToGameW(iconSnow, 0.06);

		const containerCountSnow = this.scene.add.container();

		const countSnowBack = this.scene.add.image(0, 0, 'toggleBack2')
			.setAlpha(0.7);
		Align.scaleToGameW(countSnowBack, 0.05);

		this.textSnow = this.scene.add.text(0, 0, `${this.count}`);
		this.textSnow.setOrigin(0.5);

		containerCountSnow.setPosition(snowBack.displayWidth / 3, -snowBack.displayHeight / 2);

		containerCountSnow.add([countSnowBack, this.textSnow]);

		this.setSize(snowBack.displayWidth, snowBack.displayHeight);
		this.setInteractive();

		this.add([snowBack, iconSnow, containerCountSnow]);

		this.scene.add.existing(this);

		this.on('pointerdown', this.activeBonus, this);
	}

	activeBonus() {
		if (this.texture === 'snow' && model.hold > 0) {
			console.log(`Bonus ${this.texture} clicked`);
			emitter.emit(G.DOWN_HOLD);
			emitter.emit(G.PLAY_SOUND, 'freezeSound');
		}
		else if (this.texture === 'hammer' && model.hummer > 0) {
			console.log(`Bonus ${this.texture} clicked`);
			emitter.emit(G.DOWN_HUMMER);
		}
	}
	countUpdate(count) {
		this.textSnow.setText(count);
	}

	holdItem(maxTimerHoldCount) {
		this.alpha = 0.1;
		this.disableInteractive();

		this.scene.tweens.add({
			targets: this,
			alpha: 0.99,
			duration: maxTimerHoldCount,
			onComplete: function () {
				this.setInteractive();
			}.bind(this)
		});
	}
	removeHoldItem() {
		this.alpha = 1;
	}
	animateItem() {
		this.constY = this.y;
		// this.alpha = 0.5;
		this.animate = this.scene.tweens.add({
			targets: this,
			y: this.y - 3,
			alpha: 0.5,
			duration: 250,
			ease: 'Cubic',
			yoyo: true,
			loop: -1
		})
	}

	removeAnimateItem() {
		this.setInteractive();
		this.animate.stop();
		this.alpha = 1;
		this.y = this.constY;
	}

}