import { model, emitter, G } from '../../../index';

export default class Controller {
	constructor() {
		// Слушаем события обновления счета
		emitter.on(G.SET_SCORE, this.setScore, this);
		emitter.on(G.UP_POINTS, this.upPoints, this);
		emitter.on(G.DELETE_MONEY, this.deleteMoney, this);


		// Слушаем события обновления бонуса заморозки
		emitter.on(G.UP_HOLD, this.upHold, this);
		emitter.on(G.DOWN_HOLD, this.downHold, this);

		// Слушаем события обновления бонуса молоток
		emitter.on(G.UP_HUMMER, this.upHummer, this);
		emitter.on(G.DOWN_HUMMER, this.downHummer, this);

		// Слушаем события обновления состояния проигрывания музыки
		emitter.on(G.TOGGLE_SOUND, this.toggleSound, this);
		emitter.on(G.TOGGLE_MUSIC, this.toggleMusic, this);

		// Слушаем обновление новых фонов
		emitter.on(G.SET_BACKGROUND, this.setBackground, this);
		emitter.on(G.BACK_UPDATE, this.backUpdate, this);

	}

	// Обновление счета
	setScore(score) {
		model.score = score;
	}
	upPoints(points) {
		let score = model.score;
		score += points;
		model.score = score;
	}
	deleteMoney(val) {
		let score = model.score;
		score -= val;
		model.score = score;
	}

	toggleSound(val) {
		model.soundOn = val;
	}
	toggleMusic(val) {
		model.musicOn = val;
	}

	// Обновление бонуса заморозки времени
	upHold() {
		let hold = model.hold;
		hold += 1;
		model.hold = hold;
	}
	downHold() {
		let hold = model.hold;
		hold -= 1;
		model.hold = hold;
	}

	// Обновление бонуса молоток
	upHummer() {
		let hummer = model.hummer;
		hummer += 1;
		model.hummer = hummer;
	}

	downHummer() {
		let hummer = model.hummer;
		hummer -= 1;
		model.hummer = hummer;
	}

	setBackground(val) {
		console.log(val);

	}

	backUpdate(val) {
		let arr = model.openBg;
		arr.push(val);
		model.openBg = arr;
	}

}