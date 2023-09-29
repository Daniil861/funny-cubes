import { emitter, G } from "../../..";

export default class Model {
	constructor() {
		// Перечень цветов, доступных для установки как фон в игре
		// this.backgroundColors = ['1dc8fc', '6699ff', 'c266ff', 'bfff66', 'fff266'];
		this.backgroundColors = ['1dc8fc', 'e600ff', 'c266ff', 'bfff66', 'fff266'];

		// Какой фон сейчас выбран
		this._currentBgColor = 0;

		this._openedBackgrounds = [1, 2, 3];

		// Какие кубики сейчас выбраны
		this._currentCubs = 0;

		// Счет игры
		this._score = 10000; // 1000

		// bonuses
		this._hold = 0;
		this._hummer = 0;

		// prices
		this._priceHold = 500;
		this._priceHammer = 200;

		this.backSettings = {
			_bg_1: {
				price: 0,
				isBuying: true
			},
			_bg_2: {
				price: 0,
				isBuying: true
			},
			_bg_3: {
				price: 1200,
				isBuying: false
			},
			_bg_4: {
				price: 1200,
				isBuying: false
			},
		}

		this.cubsSettings = {
			_cubs_1: {
				price: 0,
				isBuying: true
			},
			_cubs_2: {
				price: 0,
				isBuying: true
			},
			_cubs_3: {
				price: 5000,
				isBuying: false
			},
		}

		this.soundOn = true;
		this._musicOn = true; // Стартовые настройки звуков

		this.gameOver = false;

		this.isMusicPlayBeforeHidePage = false;

		this.finalPin = null; // 'Title' or 'Start' - это пин, по которому определяю на какую сцену закидывать после показа рекламы

		this._bestScore = 0;
	}

	set score(val) {
		this._score = val;
		emitter.emit(G.POINTS_UPDATED);
		console.log('SCORE UPDATED');
	}
	get score() {
		return this._score;
	}

	set bgColor(val) {
		this._currentBgColor = val;
	}
	get bgColor() {
		return this._currentBgColor;
	}

	set musicOn(val) {
		this._musicOn = val;
		emitter.emit(G.MUSIC_CHANGED)
	}
	get musicOn() {
		return this._musicOn;
	}

	get priceHold() {
		return this._priceHold;
	}
	get priceHummer() {
		return this._priceHammer;
	}

	set hold(val) {
		this._hold = val;
		emitter.emit(G.HOLD_UPDATED);
		// console.log('HOLD UPDATED');
	}
	get hold() {
		return this._hold;
	}

	set hummer(val) {
		this._hummer = val;
		emitter.emit(G.HUMMER_UPDATED);
		// console.log('HUMMER UPDATED');
	}
	get hummer() {
		return this._hummer;
	}

	set openBg(val) {
		this._openedBackgrounds = val;

	}

	get openBg() {
		return this._openedBackgrounds;
	}

	set setBackground(val) {
		this._currentBgColor = val;
		emitter.emit(G.BACK_UPDATED);
	}

	get setBackground() {
		return this._currentBgColor;
	}

	set setCurrentCubs(val) {
		this._currentCubs = val;
		emitter.emit(G.CUBS_UPDATED);
	}

	get setCurrentCubs() {
		return this._currentCubs;
	}

	set bestScore(val) {
		this._bestScore = val;
	}

	get bestScore() {
		return this._bestScore;
	}

}