import { config, model, emitter, G } from "../../../index";
import Align from "../../lib/utils/Align";
import Tools from '../../lib/utils/Tools';

export default class BonusLine extends Phaser.GameObjects.Container {
	constructor(info) {
		super(info.scene);
		this.scene = info.scene;

		this.x = info.x;
		this.y = info.y;

		this.texture = info.texture;

		this.text = info.text;
		this.priceCount = info.price;
		this.countNum = info.count;

		this.width = info.width;
		this.height = info.height / 2;

		this.style = {
			color: '#423b26',
			fontSize: '20px',
			fontFamily: 'June_Bug'
		}

		// Определяем отступ между элементами линии
		this.xOffset = this.width / 40;

		// Для контроля границ создаем временный бордер
		// const border = this.createTechicalBorder();

		//===
		// Создаем иконку бонуса
		this.createIcon();
		//===

		//===
		// Создаем название бонуса
		this.createTitle();
		//===

		//===
		// Создаем цифру - количество в запасе
		this.createCount();
		//===

		//===
		// Создаем цифру - цена
		this.createPrice();
		//===

		//===
		// Создаем кнопку - купить
		this.createBtnBuy();
		this.initEvents();
		//===


		// this.add([border, this.image, this.text, this.count, this.price, this.button]);
		this.add([this.image, this.text, this.count, this.price, this.button]);

		this.scene.add.existing(this);
	}

	createTechicalBorder() {
		const border = this.scene.add.graphics({ lineStyle: { width: 1, color: 0xff0000 } });
		border.strokeRect(0, 0, this.width, this.height);
		return border;
	}

	createIcon() {
		this.image = this.scene.add.image(0, 0, this.texture).setOrigin(0);
		Align.scaleToGameW(this.image, 0.1);

		this.image.x = 10;
		this.image.y = Align.yCenterInContainer(this.image, this);
	}

	createTitle() {
		this.text = this.scene.add.text(0, 0, this.text, this.style);

		Align.scaleToGameW(this.text, 0.3);

		this.text.x = this.image.x + this.image.displayWidth + this.xOffset;
		this.text.y = Align.yCenterInContainer(this.text, this);
	}

	createCount() {
		this.count = this.scene.add.text(0, 0, this.countNum, this.style);

		this.count.x = this.text.x + this.text.displayWidth + this.xOffset;
		this.count.y = Align.yCenterInContainer(this.count, this);
	}

	createPrice() {
		this.price = this.scene.add.text(0, 0, this.priceCount, this.style);

		this.price.x = this.count.x + this.count.displayWidth + this.xOffset;
		this.price.y = Align.yCenterInContainer(this.price, this);
	}

	createBtnBuy() {
		this.button = this.scene.add.container();

		const back = this.scene.add.image(0, 0, 'button1');
		Align.scaleToGameW(back, 0.2);

		const text = this.scene.add.text(0, 0, 'Купить', this.style);
		text.setOrigin(0.5);
		Align.scaleToGameW(text, 0.15);

		this.button
			.setSize(back.displayWidth, back.displayHeight)
			.setPosition(this.button.width / 2, this.button.height / 2)
			.setInteractive();

		this.button.x = this.price.x + this.price.displayWidth + this.xOffset + this.button.width / 2;
		this.button.y = Align.yCenterInContainer(this.button, this);

		this.button.add([back, text]);
	}

	initEvents() {
		this.button.on('pointerdown', this.buttonClick, this);
	}

	buttonClick(pointer) {
		console.log(emitter);
		// Блокируем кнопку от частых кликов
		Tools.disableBlock(this.button, this.scene, 500);
		emitter.emit(G.PLAY_SOUND, 'deleteMoneySound');

		// Проверяем что кликнули по кнопке бонуса заморозки и есть деньги
		if (this.texture === 'snow' && model.score >= this.priceCount) {
			// console.log('Buy snow bonus');
			emitter.emit(G.UP_HOLD);
			emitter.emit(G.DELETE_MONEY, this.priceCount);
			this.count.setText(model.hold);
		} else if (this.texture === 'snow' && model.score < this.priceCount) {
			// console.log('NO MONEY');
			emitter.emit(G.NO_MONEY);
		}

		// Проверяем что кликнули по кнопке бонуса молотка и есть деньги
		if (this.texture === 'hammer' && model.score >= this.priceCount) {
			// console.log('Buy HAMMER bonus');
			emitter.emit(G.DELETE_MONEY, this.priceCount);
			emitter.emit(G.UP_HUMMER);
			this.count.setText(model.hummer);
		} else if (this.texture === 'hammer' && model.score < this.priceCount) {
			// console.log('NO MONEY');
			emitter.emit(G.NO_MONEY);
		}
	}

}