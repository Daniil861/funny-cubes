import { model, emitter, G } from "../../../index";
import Align from "../../lib/utils/Align";

export default class ScoreBox extends Phaser.GameObjects.Container {
	constructor(info) {
		super(info.scene);
		this.scene = info.scene;
		this.x = info.x;
		this.y = info.y;

		this.style = {
			font: '18px June_Bug',
		}

		this.borderScore = this.scene.add.sprite(0, 0, 'score-bg-2');
		Align.scaleToGameW(this.borderScore, 0.5);

		this.scoreText = this.scene.add.text(0, 0, model._score, this.style).setOrigin(0.5);
		this.scoreText.setTint(0xFFE608, 0xFFE608, 0xFF5C00, 0xFF5C00);

		this.coin = this.scene.add.sprite(0, 0, 'coin');
		Align.scaleToGameW(this.coin, 0.1);
		this.coin.x = this.coin.x - this.borderScore.displayWidth / 2 + this.coin.displayWidth / 4;


		this.setSize(this.borderScore.displayWidth, this.borderScore.displayHeight);
		this.scene.add.existing(this);

		this.add([this.borderScore, this.scoreText, this.coin]);

		this.animateCoin();
	}
	animateCoin() {
		this.timer = this.scene.time.addEvent({
			delay: 20000,
			callback: this.startAnimation,
			callbackScope: this,
			loop: true
		})
	}
	startAnimation() {
		let count = 0;
		count = Phaser.Math.Between(1, 3);
		if (count === 1) this.animationCoin_1();
		else if (count === 2) this.animationCoin_2();
		else if (count === 3) this.animationCoin_3();
	}
	animationCoin_1() {
		this.scene.tweens.add({
			targets: this.coin,
			ease: 'Linear',
			x: this.coin.x + this.width - this.coin.width,
			rotation: 5,
			duration: 2000,
			yoyo: true,
		})
	}
	animationCoin_2() {
		this.scene.tweens.add({
			targets: this.coin,
			scale: 0.4,
			ease: 'Elastic.easeIn',
			duration: 3000,
			yoyo: true,
		})
	}
	animationCoin_3() {
		this.scene.tweens.add({
			targets: this.coin,
			ease: 'Elastic.easeIn',
			rotation: 2,
			duration: 2000,
			yoyo: true,
		})
	}

	scoreUpdate() {
		const score = model._score;
		this.scoreText.setText(score);
	}
	noMoney() {
		this.scoreText.setTint(0xFF0000, 0xDC143C, 0xFF0000, 0xFF1493);
		this.scene.tweens.add({
			targets: this.scoreText,
			y: this.scoreText.y + 5,
			ease: 'Linear',
			duration: 250,
			yoyo: true,
			repeat: 1,
			onComplete: function () {
				this.scoreText.setTint(0xFFE608, 0xFFE608, 0xFF5C00, 0xFF5C00);
			}.bind(this)
		})
	}
	addMoney() {
		this.scoreText.setTint(0xFFD700, 0xFFFF00, 0xFFD700, 0xFFFF00);
		this.scene.tweens.add({
			targets: this.scoreText,
			y: this.scoreText.y - 5,
			ease: 'Linear',
			duration: 250,
			yoyo: true,
			repeat: 1,
			onComplete: function () {
				this.scoreText.setTint(0xFFE608, 0xFFE608, 0xFF5C00, 0xFF5C00);
			}.bind(this)
		})
	}
	deleteMoney() {
		this.scoreText.setTint(0xFF0000, 0xDC143C, 0xFF0000, 0xFF1493);
		this.scene.tweens.add({
			targets: this.scoreText,
			y: this.scoreText.y + 2,
			ease: 'Linear',
			duration: 150,
			yoyo: true,
			onComplete: function () {
				this.scoreText.setTint(0xFFE608, 0xFFE608, 0xFF5C00, 0xFF5C00);
			}.bind(this)
		})
	}
}