import { model } from "../../../index.js";
import BonusLine from "./BonusLine.js";

export default class ShopBox extends Phaser.GameObjects.Container {
	constructor(info) {
		super(info.scene);
		this.scene = info.scene;
		this.buttonBackInfo = info.button;

		this.width = this.scene.game.config.width - 20;
		this.height = this.scene.game.config.height / 8;

		this.x = this.scene.game.config.width / 2 - this.width / 2;
		this.y = info.y;

		// Для контроля границ контейнера
		// const border = this.scene.add.graphics({ lineStyle: { width: 1, color: 0x00ff00 } });
		// border.strokeRoundedRect(0, 0, this.width, this.height, 20);

		// Задаем фон блока с покупками
		const background = this.scene.add.graphics({ fillStyle: { color: 0xffc618, alpha: 0.5 } });
		background.fillRoundedRect(0, 0, this.width, this.height, 20);

		// Создаем первыую линию с бонусом
		this.createBonusHold();

		// Создаем вторую линию с бонусом
		this.createBonusHummer();

		this.scene.add.existing(this);

		// this.add([background, border, this.bonus_1, this.bonus_2]);
		this.add([background, this.bonus_1, this.bonus_2]);
	}

	createBonusHold() {
		this.bonus_1 = new BonusLine({
			scene: this.scene,
			x: 0,
			y: 0,
			width: this.width,
			height: this.height,
			texture: 'snow',
			text: 'Заморозка',
			price: model.priceHold,
			count: model.hold
		})
	}

	createBonusHummer() {
		this.bonus_2 = new BonusLine({
			scene: this.scene,
			x: 0,
			y: this.height / 2,
			width: this.width,
			height: this.height,
			texture: 'hammer',
			text: 'Молоток',
			price: model.priceHummer,
			count: model.hummer
		})
	}

}