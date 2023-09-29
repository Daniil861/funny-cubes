import { model, emitter, G } from "../../../../index";
import Align from "../../../lib/utils/Align";
import Tools from '../../../lib/utils/Tools';


export default class CubsStoreBlock extends Phaser.GameObjects.Container {
	constructor(info) {
		super(info.scene);
		this.scene = info.scene;

		this.diametrCircle = this.scene.game.config.width / 20;
		this.widthBorder = 2;

		this.titleText = info.titleText;

		this.x = info.x;
		this.y = info.y;

		this.height = info.height;

		this.price = info.price;
		this.isBuying = info.isBuying;

		this.numberCubs = info.numberCubs;

		this.texture = info.texture;

		this.style = {
			color: '#423b26',
			fontSize: '18px',
			fontFamily: 'June_Bug'
		}

		this.createCircle();

		this.width = this.circle.displayWidth * 1.5;
		// Для контроля границ создаем временный бордер
		// const border = this.createTechicalBorder();

		this.title = this.scene.add.text(0, this.circle.y + this.circle.displayHeight + 5, this.titleText, {
			color: '#423b26',
			fontSize: '12px',
			fontFamily: 'June_Bug'
		})

		this.title.x = Align.xCenterInContainer(this.title, this);
		this.circle.x = Align.xCenterInContainer(this.circle, this);

		this.createBtnBuy();
		this.updateActiveBorder();

		this.scene.add.existing(this);

		// this.add([border, this.circle, this.title, this.button]);
		this.add([this.circle, this.title, this.button]);

		this.updateActiveBorder();
	}

	createTechicalBorder() {
		const border = this.scene.add.graphics({ lineStyle: { width: 1, color: 0xff0000 } });
		border.strokeRect(0, 0, this.width, this.height);
		return border;
	}

	createCircle() {

		this.circle = this.scene.add.image(0, 0, this.texture)
			.setOrigin(0);

		this.circle.displayWidth = this.height * 0.4;
		this.circle.scaleY = this.circle.scaleX; // вызываем перерисовку данного объекта
	}

	createBtnBuy() {
		this.button = this.scene.add.container();

		this.buttonback = this.scene.add.graphics({ fillStyle: { color: 0x5698f5 } });
		this.buttonback.fillRoundedRect(0, 0, this.width, this.width * 0.5, 10);

		this.button
			.setSize(this.width, this.width * 0.5)
			.setPosition(0, this.title.y + this.title.displayHeight + 10);

		const text = this.isBuying ? 'V' : this.price;
		const fontSize = this.isBuying ? '18px' : '14px';

		this.buttonText = this.scene.add.text(0, 0, text, {
			color: '#423b26',
			fontSize: fontSize,
			fontFamily: 'June_Bug'
		});

		this.buttonText.setPosition(this.button.width / 2 - this.buttonText.width / 2, this.button.height / 2 - this.buttonText.height / 2);

		// Для понимания границ кнопки
		const wals = this.scene.add.rectangle(0, 0, this.button.width, this.button.height).setOrigin(0).setInteractive();

		this.button.add([wals, this.buttonback, this.buttonText]);

		wals.on('pointerdown', this.buttonClick, this);
	}

	buttonClick() {
		// Проверяем - приобретен ли выбираемый фон. Если да - просто выбираем его. Если нет - проверяем достаточно ли денег и выполняем покупку
		if (this.isBuying) {
			emitter.emit(G.PLAY_SOUND, 'touchSound');
			model.setCurrentCubs = this.numberCubs;

			emitter.emit(G.CUBS_UPDATED);
		}
		else if (!this.isBuying && model.score >= this.price) {

			emitter.emit(G.PLAY_SOUND, 'deleteMoneySound');

			// Меняем текст внутри кнопки - вместо цены, ставим галочку
			this.isBuying = true;
			this.buttonText.setText('V');
			this.buttonText.setFontSize('18px');
			this.buttonText.setPosition(this.button.width / 2 - this.buttonText.width / 2, this.button.height / 2 - this.buttonText.height / 2);

			switch (this.numberCubs) {
				case 2:
					model.cubsSettings._cubs_3.isBuying = true;
					emitter.emit(G.DELETE_MONEY, this.price);
					break;
				default:
					break;
			}
		} else if (!this.isBuying && model.score < this.price) {
			emitter.emit(G.NO_MONEY);
		}
	}

	setActiveBorder() {
		this.circle.setAlpha(1);
		this.buttonText.setColor('#fff');
	}

	resetActiveBorder() {
		this.circle.setAlpha(0.5);
		this.buttonText.setColor('#423b26');
	}

	updateActiveBorder() {
		if (this.numberCubs === model.setCurrentCubs) {
			this.setActiveBorder();
		}
		else {
			this.resetActiveBorder();
		}
	}



}

