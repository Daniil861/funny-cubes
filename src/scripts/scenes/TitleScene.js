import { model, emitter, controller, G } from '../../index';

import MediaManager from '../classes/mc/MediaManager';
import AlignGrid from '../lib/utils/AlignGrid';
import Align from '../lib/utils/Align';
import FlatButton from '../classes/ui/FlatButton';
import SoundButton from '../classes/ui/SoundButton';
import StoreScreen from '../classes/components/StoreScreen.js';

import Tools from '../lib/utils/Tools';

export default class TitleScene extends Phaser.Scene {
	constructor() {
		super('Title');

		this.buttonTextConfig = {
			color: '#423b26',
			fontSize: '20px',
			fontFamily: 'June_Bug'
		}

		this.initEvents();
	}

	create() {
		model.finalPin = null;

		// this.createBackground();
		this.createTitle();

		this.createTechGrid();

		this.alignGrid.placeAtIndex(16, this.title);
		//===

		this.createStartButton();
		this.createShopButton();

		this.alignGrid.placeAtIndex(93, this.buttonStart);
		this.alignGrid.placeAtIndex(104, this.buttonStore);

		// Создаем медиа менеджер
		// Так как в медиаменеджере есть объявления событий - создаем его только один раз
		// Для этого перед созданием - проверяем, не создан ли уже.
		if (!this.mediaManager) this.createMediaManager();
		this.mediaManager.setBackgroundMusic('titleSound');

		this.createSoundButton();

		this.createStoreScreen();

		this.createBestScoreText();

		emitter.on(G.POINTS_UPDATED, this.scoreUpdate, this);

		if (!emitter._events.backgroundUpdated) emitter.on(G.BACK_UPDATED, this.backUpdated, this);

		// if (!Array.isArray(emitter._events.cubsUpdated)) {
		// 	emitter.on(G.CUBS_UPDATED, this.cubsUpdated, this);
		// }

		if (!emitter._events.cubsUpdated) emitter.on(G.CUBS_UPDATED, this.cubsUpdated, this);
	}

	backUpdated() {
		this.storeBox.bgBox.backUpdated();
	}
	cubsUpdated() {
		this.storeBox.cubsBox.cubsUpdated();
	}

	// Создаем сетку, для выравнивания элементов игры
	createTechGrid() {

		const gridConfig = {
			rows: 11,
			cols: 11,
			scene: this
		}

		this.alignGrid = new AlignGrid(gridConfig);
		this.alignGrid.createNumbers();
		this.alignGrid.hideNumbers();
	}

	createBackground() {
		this.titleBg = this.add.image(this.game.config.width / 2, this.game.config.height / 2, 'titleBg');

		const { newBgWidth, newBgHeight } = Align.cover(this, 'titleBg');

		this.titleBg.displayWidth = newBgWidth;
		this.titleBg.displayHeight = newBgHeight;
	}

	createMediaManager() {
		this.mediaManager = new MediaManager({ scene: this });
	}

	createTitle() {
		// Для английской версии - титульник картинкой
		// this.title = this.add.image(0, 0, 'title-1');

		// Для русской версии титульник текстом
		this.title = this.add.text(0, 0, 'Веселые Кубики', {
			fontSize: '80px',
			fontFamily: 'June_Bug',
			color: '#1afbfb',
			shadow: {
				offsetX: 1,
				offsetY: 3,
				color: '#000',
				blur: 5,
				fill: true
			},
		});
		this.title.setOrigin(0.5);

		// Задаем размер элемента относительно размера игры
		Align.scaleToGameW(this.title, 0.95);
	}

	createStartButton() {
		this.buttonStart = new FlatButton({
			scene: this,
			key: 'button2',
			text: 'Играть',
			x: 0,
			y: 0,
			event: 'start_game',
			params: 'fire_lasers',
			textConfig: this.buttonTextConfig
		})
	}

	createShopButton() {

		this.buttonStore = new FlatButton({
			scene: this,
			key: 'button2',
			text: 'Магазин',
			x: 0,
			y: 0,
			event: 'store',
			params: 'fire_lasers',
			textConfig: this.buttonTextConfig
		})
	}

	createSoundButton() {
		this.sb = new SoundButton({ scene: this, status: 1 });
		this.sb.x = 10;
		this.sb.y = 10;
	}

	createStoreScreen() {
		this.storeBox = new StoreScreen({ scene: this });

		this.storeBox.alpha = 0;
		this.storeBox.x = this.game.config.width;
	}

	createBestScoreText() {
		this.bestScoreText = this.add.text(
			0,
			10,
			`Лучший счет: ${model._bestScore}`,
			{
				color: '#423b26',
				fontSize: '20px',
				fontFamily: 'June_Bug',
				align: 'center',
				wordWrap: {
					width: this.game.config.width * 0.5
				},
			}
		);
		this.bestScoreText.x = this.game.config.width - this.bestScoreText.width - 20;
	}

	initEvents() {
		emitter.on('start_game', this.startGame, this);
		emitter.on('store', this.showStoreScreen, this);

		emitter.on(G.DELETE_MONEY, this.deleteMoney, this);
		emitter.on(G.NO_MONEY, this.noMoney, this);

		window.addEventListener('keydown', (e) => {

			// При клике на копку d - показываем сетку
			if (e.keyCode == 68 && this.alignGrid.isVisible) {
				this.alignGrid.hideNumbers();
			} else if (e.keyCode == 68 && !this.alignGrid.isVisible) {
				this.alignGrid.showNumbers();
			}
		})
	}
	scoreUpdate() {
		this.storeBox.scoreBox.scoreUpdate();
	}
	deleteMoney() {
		this.storeBox.scoreBox.deleteMoney();
	}
	noMoney() {
		this.storeBox.scoreBox.noMoney();
	}

	startGame() {
		Tools.disableBlock(this.buttonStart.back, this);
		emitter.emit(G.PLAY_SOUND, 'touchSound');

		delete emitter._events.scoreUpdated; // Я в нескольких сценах "слушаю" событие изменение счета, поэтому проще каждый раз создавать и удалять

		this.tweens.add({
			targets: this.buttonStart, // здесь указваем объект GameObject. Так как мы находимся в классе карты - указываем this
			y: this.buttonStart.y + 5, // указываем свойство, которое будем изменять и параметр до которого происходит изменение
			ease: 'Cubic.Out', // тип анимации
			duration: 150, // мс - время проигрывания анимации
			yoyo: true,
			onComplete: () => {
				emitter.emit(G.BG_MUSIC_STOP);
				this.scene.start('Start');
				document.querySelector('body').setAttribute('class', '_game');
			}
		})
	}

	showStoreScreen() {
		Tools.disableBlock(this.buttonStore.back, this);
		emitter.emit(G.PLAY_SOUND, 'touchSound');

		this.tweens.add({
			targets: this.buttonStore,
			y: this.buttonStore.y + 5,
			ease: 'Cubic.Out',
			duration: 150,
			yoyo: true,
			onComplete: () => {
				this.animateBlock(this, this.storeBox);

				// Убираем активные элементы главного экрана, так как даже если их накрыть другими объектами - они все равно
				// будут обрабатывать события клика, то есть если кликнем в область где должен находиться активный 
				// элемент - он сработает, даже не смотря на то что его не видно(накрыт другим элементом)
				this.buttonStore.x = this.buttonStore.x - this.game.config.width;
				this.buttonStart.x = this.buttonStart.x - this.game.config.width;
				this.sb.x = this.sb.x - this.game.config.width;
				this.title.x = this.title.x - this.game.config.width;
			}

		})
	}

	animateBlock(context, block) {
		context.tweens.add({
			targets: block,
			alpha: 1,
			x: 0,
			ease: 'Cubic.Out',
			duration: 300,
		})
	}

}