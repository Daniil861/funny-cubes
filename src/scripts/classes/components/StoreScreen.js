import { model, emitter, G } from "../../../index";
import Align from "../../lib/utils/Align";
import ScoreBox from "./ScoreBox";
import ShopBox from "./ShopBox";
import BackgroundBox from './storeScreen/BackgroundsBox.js';
import CubsBox from "./storeScreen/CubsBox.js";

export default class StoreScreen extends Phaser.GameObjects.Container {
	constructor(info) {
		super(info.scene);
		this.scene = info.scene;

		this.width = this.scene.game.config.width;
		this.height = this.scene.game.config.height;

		this.style = {
			color: '#423b26',
			fontSize: '20px',
			fontFamily: 'June_Bug'
		}

		// Создаем фон
		this.createBackground();

		// Создаем хедер
		this.createHeader();

		// Создаем под хедером scorebox
		this.createScoreBox();

		//=========
		// Под счетом создаем первый блок с товарами - игровые бонусы
		this.titleBonuses = this.createNameBox(0, this.scoreBox.y + this.scoreBox.height + this.height * 0.025, 'Игровые бонусы');
		this.titleBonuses.setOrigin(0.5);
		Align.centerH(this.titleBonuses);

		this.createGameBonusesBox();
		//=========

		//========
		// Создаем второй блок - блок с выбором фонов игры
		this.titleBgs = this.createNameBox(0, this.bonusesBox.y + this.bonusesBox.height + this.height * 0.05, 'Фоны игры')
			.setOrigin(0.5);
		Align.centerH(this.titleBgs);

		this.createBgBox();

		//=======
		// Создаем третий блок - блок с выбором игровых кубиков
		this.titleCubs = this.createNameBox(0, this.bgBox.y + this.bgBox.height + this.height * 0.05, 'Игровые кубики')
			.setOrigin(0.5);
		Align.centerH(this.titleCubs);
		this.createCubsBox();

		this.scene.add.existing(this);

		this.add([
			// this.titleBg,
			this.backRect,
			this.header,
			this.scoreBox,
			this.titleBonuses,
			this.bonusesBox,
			this.titleBgs,
			this.bgBox,
			this.titleCubs,
			this.cubsBox
		]);

		this.initEvents();

	}

	createBackground() {
		// this.titleBg = this.scene.add.image(this.scene.game.config.width / 2, this.scene.game.config.height / 2, 'titleBg');

		// const { newBgWidth, newBgHeight } = Align.cover(this.scene, 'titleBg');

		// this.titleBg.displayWidth = newBgWidth;
		// this.titleBg.displayHeight = newBgHeight;

		this.backRect = this.scene.add.graphics({ fillStyle: { color: 0xffffff, alpha: 0.6 } });

		this.backRect.fillRect(0, 0, this.width, this.height);
	}

	//=========
	// header
	createHeader() {
		this.header = this.scene.add.container();

		this.createBtnLobby();

		this.header.width = this.width - 20;
		this.header.height = this.buttonHome.displayHeight;

		this.createTitle();

		// Бордер - для проверки границ контейнера
		// const graphics = this.scene.add.graphics({ lineStyle: { width: 1, color: 0xff0000 } });
		// graphics.strokeRect(0, 0, this.header.width, this.header.height);

		this.header.x = Align.xCenterInContainer(this.header, this);
		this.header.y = 10;

		this.header.add([this.buttonHome, this.title]);
	}

	createBtnLobby() {
		this.buttonHome = this.scene.add.container();

		this.btnBg = this.scene.add.image(0, 0, 'toggleBack');
		Align.scaleToGameW(this.btnBg, 0.1);

		const icon = this.scene.add.image(0, 0, 'arrow');
		Align.scaleToGameW(icon, 0.08);

		this.buttonHome
			.setSize(this.btnBg.displayWidth, this.btnBg.displayHeight)
			.setPosition(this.buttonHome.width / 2, this.buttonHome.height / 2)
			.setInteractive();

		// Для понимания границ кнопки
		// const wals = this.scene.add.rectangle(0, 0, this.buttonHome.width, this.buttonHome.height, 0x6666ff);

		this.buttonHome.add([this.btnBg, icon]);
	}

	createTitle() {
		this.title = this.scene.add.text(0, 0, 'Магазин', {
			color: '#1afbfb',
			fontSize: '30px',
			fontFamily: 'June_Bug',
			shadow: {
				offsetX: 1,
				offsetY: 3,
				color: '#000',
				blur: 5,
				fill: true
			},
		});

		Align.scaleToGameW(this.title, 0.5);

		this.title.x = Align.xCenterInContainer(this.title, this.header);
		this.title.y = Align.yCenterInContainer(this.title, this.header);
	}

	createScoreBox() {
		this.scoreBox = new ScoreBox({
			scene: this.scene,
			x: 0,
			y: this.header.y + this.header.height + 30
		});
		Align.centerH(this.scoreBox);
	}
	//=========

	createGameBonusesBox() {
		this.bonusesBox = new ShopBox({
			scene: this.scene,
			button: this.buttonHome,
			y: this.titleBonuses.y + this.titleBonuses.height + 20
		})

	}

	//=========
	createNameBox(x, y, text) {
		const title = this.scene.add.text(x, y, text, this.style);

		return title;
	}

	createBgBox() {
		this.bgBox = new BackgroundBox({
			scene: this.scene,
			y: this.titleBgs.y + this.titleBgs.height
		})
	}

	createCubsBox() {
		this.cubsBox = new CubsBox({
			scene: this.scene,
			y: this.titleCubs.y + this.titleCubs.height
		})
	}

	initEvents() {
		this.buttonHome.on('pointerdown', this.clickButtonHome, this);

	}

	clickButtonHome() {
		emitter.emit(G.PLAY_SOUND, 'touchSound');

		this.scene.tweens.add({
			targets: this.scene.storeBox,
			alpha: 0,
			x: this.scene.game.config.width,
			ease: 'Cubic.Out',
			duration: 300
		})

		// Показываем обратно активные элементы клавного экрана
		this.animateBlock(this.scene, this.scene.buttonStore, this.scene.buttonStore.x + this.scene.game.config.width);
		this.animateBlock(this.scene, this.scene.buttonStart, this.scene.buttonStart.x + this.scene.game.config.width);
		this.animateBlock(this.scene, this.scene.sb, this.scene.sb.x + this.scene.game.config.width);
		this.animateBlock(this.scene, this.scene.title, this.scene.title.x + this.scene.game.config.width);
	}

	animateBlock(context, block, x) {
		context.tweens.add({
			targets: block,
			alpha: 1,
			x: x,
			ease: 'Cubic.Out',
			duration: 300,
		})
	}

}

