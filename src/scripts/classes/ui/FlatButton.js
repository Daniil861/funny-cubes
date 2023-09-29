import { emitter, G, model } from "../../..";

export default class FlatButton extends Phaser.GameObjects.Container {
	constructor(params) {
		if (!params.scene) {
			console.log('missing scene!');
			return;
		}
		if (!params.key) {
			console.log('missing key');
			return;
		}
		super(params.scene);

		this.scene = params.scene;
		this.config = params;

		this.back = this.scene.add.image(0, 0, params.key);

		this.add(this.back);

		if (params.text) {
			if (params.textConfig) {
				this.text1 = this.scene.add.text(0, 0, params.text, params.textConfig);
			} else {
				this.text1 = this.scene.add.text(0, 0, params.text);
			}

			this.text1.setOrigin(0.5);
			this.add(this.text1);
		}
		if (params.x) {
			this.x = params.x;
		}
		if (params.y) {
			this.y = params.y;
		}
		this.setSize(this.back.displayWidth, this.back.displayHeight);

		this.scene.add.existing(this);

		if (params.event) {
			this.back.setInteractive();
			this.back.on('pointerdown', this.pressed, this);
		}

		// Отслеживаем события наведения на кнопку. Запускаем функции анимирования при наведении и потере навежения
		if (model.isMobile == -1) {
			this.back.on('pointerover', this.over, this);
			this.back.on('pointerout', this.out, this);
		}
	}

	//===
	// Анимируем при наведении
	over() {
		this.scene.tweens.add({
			targets: this,
			y: this.y - 5,
			ease: 'Linear',
			duration: 300,
		})
	}

	out() {
		this.scene.tweens.add({
			targets: this,
			y: this.y + 5,
			ease: 'Linear',
			duration: 300,
		})
	}
	//===

	pressed() {
		// Если мы хотим в данное событие передать како-либо параметр - проверяем есть ли такой параметр
		// и в таком случае передаем аргументом, в регистрации события

		if (this.config.params) {
			emitter.emit(this.config.event, this.config.params);
		} else {
			emitter.emit(this.config.event);
		}

	}
}