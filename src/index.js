import Phaser from 'phaser';

import BootScene from './scripts/scenes/BootScene.js';
import PrivacyScene from './scripts/scenes/PrivacyScene.js';
import PreloadScene from './scripts/scenes/PreloadScene.js';
import TitleScene from './scripts/scenes/TitleScene.js';
import StartScene from './scripts/scenes/StartScene.js';
import FinalScene from './scripts/scenes/FinalScene.js';

import Model from './scripts/classes/mc/Model.js';
import Constans from './scripts/classes/Constans.js';
import Controller from './scripts/classes/mc/Controller.js';

import './scripts/lib/utils/disableSettings.js';
// import './scripts/lib/SDK/yandexADS.js';
import SDKYandex from './scripts/lib/SDK/yandexADS.js';
import { isMobile as getMobile } from './scripts/lib/utils/Tools.js';

import './index.html';
import './style.scss';


let config, model, emitter, G, controller;


window.addEventListener('load', function () {

	// Определяем на каком устройстве открывается игра и в зависимости от этого создаем разные настройки
	let isMobile = navigator.userAgent.indexOf("Mobile");
	if (isMobile === -1) {
		isMobile = navigator.userAgent.indexOf("Tablet");
	}

	// Если десктоп
	if (isMobile === -1) {
		config = {
			type: Phaser.AUTO,
			// backgroundColor: 0x1dc8fc,
			transparent: true,
			width: 700,
			height: 1244,
			audio: {
				disableWebAudio: getMobile.iOS() ? true : false
			},
			scale: {
				mode: Phaser.Scale.FIT,
				autoCenter: Phaser.Scale.CENTER_BOTH,
				parent: 'thegame',
				width: 700,
				height: 1244,
			},
			scene: [BootScene, PreloadScene, TitleScene, StartScene, FinalScene]
		}
	} else { // Если планшет или мобила
		config = {
			type: Phaser.AUTO,
			transparent: true,
			width: 360,
			height: 700,
			scale: {
				mode: Phaser.Scale.FIT,
				autoCenter: Phaser.Scale.CENTER_BOTH,
			},
			parent: 'thegame',
			audio: {
				disableWebAudio: getMobile.iOS() ? true : false
			},
			scene: [BootScene, PreloadScene, TitleScene, StartScene, FinalScene]
		};
	}

	const game = new Phaser.Game(config);

	model = new Model();
	model.isMobile = isMobile;

	emitter = new Phaser.Events.EventEmitter();

	G = new Constans();

	controller = new Controller();

	const SDK = new SDKYandex(game);
	// console.log(SDK);

	window.focus();
})


export { config, model, emitter, G, controller };