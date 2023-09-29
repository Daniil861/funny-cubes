import { model, emitter, G } from '../../index';
import { showAd } from '../lib/SDK/yandexADS.js';

import FlatButton from '../classes/ui/FlatButton';

export default class FinalScene extends Phaser.Scene {
	constructor() {
		super('FinalScene');

		this.coinsWin = 0;

		this.textButtonConfig = {
			color: '#423b26',
			fontSize: '20px',
			fontFamily: 'June_Bug'
		}

		this.titleTextConfig = `
		Раунд завершен! 
		Вот сколько монет ты заработал в этом раунде:`;
	}

	init(count) {
		// Получаем счет игры из игровой сцены, записываем в текущую сцену и обновляем лучший счет игры
		this.coinsWin = count.score;
		if (this.coinsWin > model.bestScore) model.bestScore = this.coinsWin;
	}

	create() {
		this.setBgMusicForThisScene();
		this.createStartButton();
		this.createLobbyButton();
		this.createText();
		this.createCountCoins();
	}
	setBgMusicForThisScene() {

		this.timer = this.time.addEvent({
			delay: 300,
			callback: function () {
				emitter.emit(G.BG_MUSIC_CHANGE, 'finalSound');
			}.bind(this),
		})
	}

	createStartButton() {
		this.buttonGame = new FlatButton({
			scene: this,
			key: 'button2',
			text: 'Играть',
			x: 0,
			y: 0,
			textConfig: this.textButtonConfig
		})

		this.buttonGame.setInteractive();

		this.buttonGame.x = this.game.config.width * 0.5;
		this.buttonGame.y = this.game.config.height - this.buttonGame.displayHeight - this.game.config.height * 0.2;

		this.buttonGame.on('pointerdown', this.startGame, this);
	}

	createLobbyButton() {
		this.buttonMain = new FlatButton({
			scene: this,
			key: 'button2',
			text: 'На главную',
			x: 0,
			y: 0,
			textConfig: this.textButtonConfig
		})

		this.buttonMain.setInteractive();

		this.buttonMain.x = this.game.config.width * 0.5;
		this.buttonMain.y = this.buttonGame.y + this.buttonGame.displayHeight + this.game.config.height * 0.01;

		this.buttonMain.on('pointerdown', this.startTitleScene, this);
	}

	createText() {
		this.titleText = this.add.text(0, 0, this.titleTextConfig, {
			color: '#423b26',
			fontSize: '20px',
			fontFamily: 'June_Bug',
			align: 'center',
			strokeThickness: 2,
			lineSpacing: 10,
			wordWrap: { width: this.game.config.width * 0.8 }
		}).setOrigin(0.5);
		this.titleText.x = this.game.config.width * 0.5;
		this.titleText.y = this.game.config.height * 0.3;
	}

	createCountCoins() {
		this.coins = this.add.text(0, 0, this.coinsWin, {
			color: '#ffff8d',
			fontSize: '36px',
			fontFamily: 'June_Bug',
			strokeThickness: 2,
			stroke: '#423b26'
		}).setOrigin(0.5);
		this.coins.x = this.game.config.width * 0.5;
		this.coins.y = this.titleText.y + this.titleText.height * 0.7;
	}

	// Методы, которые вызываем после определенного события
	startGame() {
		console.log('Over start game');
		emitter.emit(G.BG_MUSIC_STOP);
		model.finalPin = "Start";
		// this.scene.start('Start');
		showAd("Start", this);
	}

	startTitleScene() {
		console.log('Over start title');
		emitter.emit(G.BG_MUSIC_STOP);
		model.finalPin = "Title";
		// this.scene.start('Title');
		showAd("Title", this);
	}

}