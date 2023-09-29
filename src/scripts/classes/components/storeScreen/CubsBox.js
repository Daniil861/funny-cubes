
import { model, emitter, G } from "../../../..";
import CubsStoreBlock from "./CubsStoreBlock";

export default class CubsBox extends Phaser.GameObjects.Container {
	constructor(info) {
		super(info.scene);
		this.scene = info.scene;

		this.config = this.scene.game.config;
		this.xOffset = this.config.width / 25;

		this.width = this.config.width - 20;
		this.height = this.config.height / 5;

		this.x = this.config.width / 2 - this.width / 2;
		this.y = info.y;

		const background = this.scene.add.graphics({ fillStyle: { color: 0xffc618, alpha: 0.5 } });
		background.fillRoundedRect(0, 0, this.width, this.height, 20);

		this.createItem_1();
		this.createItem_2();
		this.createItem_3();


		this.scene.add.existing(this);

		this.add([background, this.item_1, this.item_2, this.item_3]);
	}

	createItem_1() {
		this.item_1 = new CubsStoreBlock({
			scene: this.scene,
			x: this.config.width / 30,
			y: 10,
			height: this.height,
			titleText: 'Зоопарк',
			texture: 'animal-icon',
			price: model.cubsSettings._cubs_1.price,
			isBuying: model.cubsSettings._cubs_1.isBuying,
			numberCubs: 0
		})
	}

	createItem_2() {
		this.item_2 = new CubsStoreBlock({
			scene: this.scene,
			x: this.item_1.x + this.item_1.displayWidth + this.config.width / 30,
			y: 10,
			height: this.height,
			titleText: 'Алфавит',
			texture: 'letter-icon',
			price: model.cubsSettings._cubs_2.price,
			isBuying: model.cubsSettings._cubs_2.isBuying,
			numberCubs: 1
		})
	}
	createItem_3() {
		this.item_3 = new CubsStoreBlock({
			scene: this.scene,
			x: this.item_2.x + this.item_2.displayWidth + this.config.width / 30,
			y: 10,
			height: this.height,
			titleText: 'Майнкрафт',
			texture: 'minecraft-icon',
			price: model.cubsSettings._cubs_3.price,
			isBuying: model.cubsSettings._cubs_3.isBuying,
			numberCubs: 2
		})
	}


	// Когда выбираем другой фон - обновляем внешний вид блоков.
	cubsUpdated() {
		this.item_1.updateActiveBorder();
		this.item_2.updateActiveBorder();
		this.item_3.updateActiveBorder();
	}
}