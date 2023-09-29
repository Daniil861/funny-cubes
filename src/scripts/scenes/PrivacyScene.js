import { config } from '../../index';
import PrivacyText from '../prefabs/PrivacyText';

export default class PrivacyScene extends Phaser.Scene {
	constructor() {
		super('Privacy');
	}
	create() {
		this.createBackground();
		this.createBoard();

		this.createTextContainer();
		this.createButton();
	}

	createBackground() {
		this.bg = this.add.sprite(0, 0, 'bg').setOrigin(0);
	}
	createBoard() {
		this.board = this.add.sprite(-150, -100, 'board-pre')
			.setOrigin(0)
			.setScale(1.2);
	}
	createTextContainer() {
		this.textContainer = new PrivacyText({ scene: this });
	}

	createButton() {
		this.btn = this.add.sprite(0, 0, 'btn').setInteractive();

		let container = this.add.container(config.width - this.btn.width / 2 - 20, config.height - this.btn.height / 2 - 20, [this.btn]);
		container.setSize(this.btn.width, this.btn.height);

		this.btn.on('pointerdown', this.onBtnClick, this);
	}
	onBtnClick() {
		this.tweens.add({
			targets: [this.btn],
			scale: 0.9,
			ease: 'Linear',
			duration: 150,
			onComplete: () => {
				this.tweens.add({
					targets: [this.btn],
					scale: 1,
					ease: 'Linear',
					duration: 150,
					onComplete: function () {
						sessionStorage.setItem('privacy', true);
						this.scene.start('Preload');
					}.bind(this)
				})
			}
		})
	}
}
