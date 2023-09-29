
import { model, emitter, G } from "../../../..";
import BackStoreBlock from "./BackStoreBlock";

export default class BackgroundBox extends Phaser.GameObjects.Container {
	constructor(info) {
		super(info.scene);
		this.scene = info.scene;

		this.config = this.scene.game.config;
		this.xOffset = this.config.width / 25;

		this.width = this.config.width - 20;
		this.height = this.config.height / 7;

		this.x = this.config.width / 2 - this.width / 2;
		this.y = info.y;

		const background = this.scene.add.graphics({ fillStyle: { color: 0xffc618, alpha: 0.5 } });
		background.fillRoundedRect(0, 0, this.width, this.height, 20);

		this.createItem_1();
		this.createItem_2();
		this.createItem_3();
		this.createItem_4();

		this.scene.add.existing(this);

		this.add([background, this.item_1, this.item_2, this.item_3, this.item_4]);
	}

	createItem_1() {
		this.item_1 = new BackStoreBlock({
			scene: this.scene,
			x: this.config.width / 30,
			y: 10,
			height: this.height,
			color: true,
			texture: model.backgroundColors[0],
			price: model.backSettings._bg_1.price,
			isBuying: model.backSettings._bg_1.isBuying,
			numberBackground: 0
		})
	}
	createItem_2() {
		this.item_2 = new BackStoreBlock({
			scene: this.scene,
			x: this.item_1.x + this.item_1.width + this.xOffset,
			y: 10,
			height: this.height,
			color: true,
			texture: model.backgroundColors[1],
			price: model.backSettings._bg_2.price,
			isBuying: model.backSettings._bg_2.isBuying,
			numberBackground: 1
		})
	}
	createItem_3() {
		this.item_3 = new BackStoreBlock({
			scene: this.scene,
			x: this.item_2.x + this.item_2.width + this.xOffset,
			y: 10,
			height: this.height,
			color: true,
			texture: model.backgroundColors[2],
			price: model.backSettings._bg_3.price,
			isBuying: model.backSettings._bg_3.isBuying,
			numberBackground: 2
		})
	}
	createItem_4() {
		this.item_4 = new BackStoreBlock({
			scene: this.scene,
			x: this.item_3.x + this.item_3.width + this.xOffset,
			y: 10,
			height: this.height,
			color: true,
			texture: model.backgroundColors[3],
			price: model.backSettings._bg_4.price,
			isBuying: model.backSettings._bg_4.isBuying,
			numberBackground: 3
		})
	}

	// Когда выбираем другой фон - обновляем внешний вид блоков.
	backUpdated() {
		this.item_1.updateActiveBorder();
		this.item_2.updateActiveBorder();
		this.item_3.updateActiveBorder();
		this.item_4.updateActiveBorder();
	}
}