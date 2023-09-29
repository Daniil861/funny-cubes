//========================================================================================================================================================
// icons
import coin from '../../assets/sprites/icons/coin.png';

import toggleBack from '../../assets/sprites/icons/toggles/4.png';
import toggleBack2 from '../../assets/sprites/icons/toggles/t.png';
import sfxOff from '../../assets/sprites/icons/sfx_off.png';
import sfxOn from '../../assets/sprites/icons/sfx_on.png';
import musicOff from '../../assets/sprites/icons/music_off.png';
import musicOn from '../../assets/sprites/icons/music_on.png';
import button1 from '../../assets/sprites/icons/buttons/2/1.png';
import button2 from '../../assets/sprites/icons/buttons/2/y.png';
import arrow from '../../assets/sprites/icons/arrow.png';
import snow from '../../assets/sprites/icons/snow.png';
import hammer from '../../assets/sprites/icons/hammer.png';
import score_bg_1 from '../../assets/sprites/icons/buttons/score.png';
import score_bg_2 from '../../assets/sprites/icons/buttons/score-1.png';
import animalIcon from '../../assets/sprites/other/animal-icon.png';
import letterIcon from '../../assets/sprites/other/letter-icon.png';
import minecraftIcon from '../../assets/sprites/other/minecraft-icon.png';


//===
// images
import titleBg from '../../assets/sprites/other/bg-1.jpg';
import title from '../../assets/sprites/other/title.png';
import title_1 from '../../assets/sprites/other/title-1.png';
import wall from '../../assets/sprites/other/wall.png';

//===
// spritesheets
// import blocks from '../../assets/sprites/other/tiles.png';
import blocks from '../../assets/sprites/other/animals.png';
import letters from '../../assets/sprites/other/words.png';
import mCraft from '../../assets/sprites/other/minecraft.png';

//===
// sounds
import touchBlock1 from '../../assets/audio/touch-block.mp3';
import touchBlock2 from '../../assets/audio/touch-block.ogg';

// import crashBox1 from '../../assets/audio/crashBox.mp3';
// import crashBox2 from '../../assets/audio/crashBox.ogg';

import crashBox1 from '../../assets/audio/crashBox-1.mp3';
import crashBox2 from '../../assets/audio/crashBox-1.ogg';

import titleSound1 from '../../assets/audio/bg-title.mp3';
import titleSound2 from '../../assets/audio/bg-title.ogg';

import gameSound1 from '../../assets/audio/game-sound-1.mp3';
import gameSound2 from '../../assets/audio/game-sound-1.ogg';

import finalSound1 from '../../assets/audio/final.mp3';
import finalSound2 from '../../assets/audio/final.ogg';

import freezeSound1 from '../../assets/audio/freeze.mp3';
import freezeSound2 from '../../assets/audio/freeze.ogg';

import hammerSound1 from '../../assets/audio/hammer.mp3';
import hammerSound2 from '../../assets/audio/hammer.ogg';

import touchSound1 from '../../assets/audio/touch.mp3';
import touchSound2 from '../../assets/audio/touch.ogg';

import deleteMoneySound1 from '../../assets/audio/coins.mp3';
import deleteMoneySound2 from '../../assets/audio/coins.ogg';
//===
//========================================================================================================================================================


import LoadingBar from '../classes/components/LoadingBar.js';
import AlignGrid from '../lib/utils/AlignGrid.js';
import { config } from '../../index.js';
import Align from '../lib/utils/Align.js';

export default class PreloadScene extends Phaser.Scene {
	constructor() {
		super('Preload');
	}
	preload() {
		this.preloadAssets();
		// this.createBg();
		this.createTitle();

		//===
		// Создаем сетку, для выравнивания элементов игры
		Align.scaleToGameW(this.title, 0.95);

		const gridConfig = {
			rows: 11,
			cols: 11,
			scene: this
		}

		const alignGrid = new AlignGrid(gridConfig);
		// alignGrid.showNumbers();
		alignGrid.placeAtIndex(16, this.title);
		//===

		const loadingBar = new LoadingBar(this);
	}
	showProgressBar(v) {
		console.log(v);
	}
	preloadAssets() {
		// icons
		this.load.image('coin', coin);
		this.load.image('sfxOff', sfxOff);
		this.load.image('sfxOn', sfxOn);
		this.load.image('musicOff', musicOff);
		this.load.image('musicOn', musicOn);
		this.load.image('toggleBack', toggleBack);
		this.load.image('toggleBack2', toggleBack2);
		this.load.image('button1', button1);
		this.load.image('button2', button2);
		this.load.image('arrow', arrow);
		this.load.image('snow', snow);
		this.load.image('hammer', hammer);
		this.load.image('score-bg-1', score_bg_1);
		this.load.image('score-bg-2', score_bg_2);
		this.load.image('animal-icon', animalIcon);
		this.load.image('letter-icon', letterIcon);
		this.load.image('minecraft-icon', minecraftIcon);

		// images
		this.load.image('wall', wall);
		this.load.image('title', title);
		this.load.image('title-1', title_1);
		this.load.image('titleBg', titleBg);

		// Звуки - на один звук добавляем в массив несколько путей, чтобы браузер самостоятельно выбрал поддерживаемый формат
		this.load.audio('touchBlock', [touchBlock1, touchBlock2]);
		this.load.audio('crashBox', [crashBox1, crashBox2]);
		this.load.audio('titleSound', [titleSound1, titleSound2]);
		this.load.audio('gameSound', [gameSound1, gameSound2]);
		this.load.audio('finalSound', [finalSound1, finalSound2]);
		this.load.audio('freezeSound', [freezeSound1, freezeSound2]);
		this.load.audio('hammerSound', [hammerSound1, hammerSound2]);
		this.load.audio('touchSound', [touchSound1, touchSound2]);
		this.load.audio('deleteMoneySound', [deleteMoneySound1, deleteMoneySound2]);

		// spritesheets
		this.load.spritesheet('blocks', blocks, {
			frameWidth: 138,
			frameHeight: 138
		});
		this.load.spritesheet('letters', letters, {
			frameWidth: 138,
			frameHeight: 138
		});
		this.load.spritesheet('minecraft', mCraft, {
			frameWidth: 138,
			frameHeight: 138
		});

	}

	createBg() {
		this.bg = this.add.sprite(config.width / 2, config.height / 2, 'bg-2');

		// Получаем новые размеры изображения, которые вписывают изтбражение в окно
		const { newBgWidth, newBgHeight } = Align.cover(this, 'bg-2');

		// Присваиваем новые размеры фону
		this.bg.displayWidth = newBgWidth;
		this.bg.displayHeight = newBgHeight;

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
	}

	create() {
		this.scene.start('Title');
		document.querySelector('body').setAttribute('class', '_titleScreen');
		// this.scene.start('FinalScene');
	}
}