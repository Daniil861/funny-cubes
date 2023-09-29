
import * as planck from 'planck';
import { model, emitter, G } from '../../index';
import { PhysicsBox } from '../classes/components/physicsBox';
import { PhysicsWall } from '../classes/components/physicsWall';
import { toMeters, toPixels } from '../classes/components/planckUtils';
import { GameOptions } from '../classes/mc/gameOptions';

import ScoreBox from '../classes/components/ScoreBox';
import AlignGrid from '../lib/utils/AlignGrid';
import FlatButton from '../classes/ui/FlatButton';
import MediaManager from '../classes/mc/MediaManager';
import ToggleClass from '../classes/ui/ToggleButton';
import SoundButton from '../classes/ui/SoundButton';
import Align from '../lib/utils/Align';
import BonusesContainer from '../classes/components/game/BonusesContainer';

export default class StartScene extends Phaser.Scene {
	constructor() {
		super('Start');

		this.startWinCount = 10;
		this.winCount = this.startWinCount; // вознаграждение, которое начисляем когда разбили пару блоков
		this.currentWin = 0;

		// Использование бонуса заморозки
		this.isSnowBonusActive = false;
		this.timeAfterUseHoldBonus = 0;
		this.maxTimeHoldBonus = 1500;

		// Использование бонуса молотка
		this.isHammerActive = false;

		//=== Переменные для работы с увеличением уровня игры
		this.timeLevelUp = 15000; // время, через которое увеличиваем сложность игры
		this.deltaTimeLevelUp = 0;

		//===

		this.maxTimerHoldCount = 15000;

		this.timeCount = 0;
		this.startTime = 0;
		this.gameTime = 0;

		this.dynamicSpeedAddNewBox = 3500;
		// this.dynamicSpeedAddNewBox = 500; // для тестов

		emitter.on(G.DOWN_HOLD, this.downHold, this);
		emitter.on(G.DOWN_HUMMER, this.downHummer, this);

	}

	create() {
		model.finalPin = null;
		this.dynamicSpeedAddNewBox = 500;
		this.setBgColor();

		this.setBgMusicForThisScene();

		this.createGamefield();

		this.createGameGrid();
		this.createScoreBox();
		this.createButtonHome();
		this.createSoundButton();
		this.createBonusesBox();

		this.initEvents();

	}

	setBgColor() {
		this.cameras.main.setBackgroundColor(`#${model.backgroundColors[model.bgColor]}`);
	}

	createGamefield() {
		// save game width and height in a variable
		this.gameWidth = this.game.config.width;
		this.gameHeight = this.game.config.height;

		// world gravity, as a Vec2 object. It's just a x, y vector
		let gravity = new planck.Vec2(0, GameOptions.gameGravity);

		// this is how we create a Box2D world
		this.world = new planck.World(gravity);

		// add static physics boxes
		new PhysicsWall(this, this.world, this.gameWidth / 2, this.gameHeight - 20, this.gameWidth, 40);
		new PhysicsWall(this, this.world, 20, this.gameHeight / 2, 40, this.gameHeight);
		new PhysicsWall(this, this.world, this.gameWidth - 20, this.gameHeight / 2, 40, this.gameHeight);

		// Динамически определяем размер блока
		const boxSize = this.game.config.width * 0.15;

		// time event to place the first boxes
		let firstTimeEvent = this.time.addEvent({

			// event delay, in milliseconds
			delay: 200,

			// how many times do we repeat the event?
			repeat: GameOptions.startingBoxes,

			// callback function
			callback: () => {
				// add a new physics box
				this.createNewBox(boxSize);

				// is this the last time we have to repeat the event?

				if (firstTimeEvent.repeatCount == 0) {

					// time event to place the remaining boxes
					this.timerBox = this.time.addEvent({

						// event delay, in milliseconds
						delay: this.dynamicSpeedAddNewBox,

						// callback function
						callback: () => {
							// Если не активен бонус заморозка - добавляем новые блоки с GameOptions.boxDelay периодом
							if (this.timeCount <= this.startTime && !this.isHammerActive) {
								// add a new physics box
								this.createNewBox(boxSize);
							}
						},
						// repeat the event forever
						loop: true
					});
				}
			}
		});

		// array where to store the two selected boxes
		this.selectedBoxes = [];
	}

	createNewBox(boxSize) {
		let texture;
		if (model._currentCubs === 0) texture = 'blocks';
		else if (model._currentCubs === 1) texture = 'letters';
		else if (model._currentCubs === 2) texture = 'minecraft';

		const box = new PhysicsBox(
			this,
			this.world,
			Phaser.Math.Between(100, this.gameWidth - 100),
			-100,
			boxSize,
			boxSize,
			GameOptions.timeBeforeHide,
			texture
		);
	}

	createGameGrid() {
		// create game grid
		const gridConfig = {
			rows: 20,
			cols: 20,
			scene: this
		}

		this.alignGrid = new AlignGrid(gridConfig);
		this.alignGrid.createNumbers();
		this.alignGrid.hideNumbers();
	}
	createScoreBox() {
		this.scoreBox = new ScoreBox({
			scene: this,
			x: this.game.config.width * 0.5,
			y: 0
		})
		this.scoreBox.y = this.scoreBox.height / 2 + 15;
	}
	createButtonHome() {
		this.buttonHome = this.add.container();

		this.btnBg = this.add.image(0, 0, 'toggleBack');
		Align.scaleToGameW(this.btnBg, 0.1);

		const icon = this.add.image(0, 0, 'arrow');
		Align.scaleToGameW(icon, 0.08);

		this.buttonHome
			.setSize(this.btnBg.displayWidth, this.btnBg.displayHeight)
			.setPosition(this.buttonHome.width / 2, this.buttonHome.height / 2 + 17)
			.setInteractive();

		// Для понимания границ кнопки
		// const wals = this.scene.add.rectangle(0, 0, this.buttonHome.width, this.buttonHome.height, 0x6666ff);

		this.buttonHome.add([this.btnBg, icon]);
	}
	createSoundButton() {
		this.sb = new SoundButton({ scene: this, status: 2 });

		this.sb.x = this.game.config.width - 39;
		this.sb.y = 15;
	}
	createBonusesBox() {
		this.bonusesBox = new BonusesContainer({ scene: this });

		this.bonusesBox.y = this.buttonHome.y + this.buttonHome.height + 20;

	}


	initEvents() {
		emitter.on(G.POINTS_UPDATED, this.scoreUpdate, this);
		this.input.on('pointerdown', this.selectBox, this);
		this.buttonHome.on('pointerdown', this.clickButtonHome, this);

		window.addEventListener('keydown', (e) => {

			// При клике на копку d - показываем сетку
			if (e.keyCode == 68 && this.alignGrid.isVisible) {
				this.alignGrid.hideNumbers();
			} else if (e.keyCode == 68 && !this.alignGrid.isVisible) {
				this.alignGrid.showNumbers();
			}
		})

	}

	downHold() {
		// Для подсвечивания иконки, пока действует заморозка
		this.isSnowBonusActive = true;

		this.startTime = this.gameTime;
		this.timeCount = this.maxTimerHoldCount + this.startTime;
		this.bonusesBox.list[0].countUpdate(model.hold);
	}
	downHummer() {
		this.isHammerActive = true;

		this.bonusesBox.list[1].countUpdate(model.hummer);
		this.bonusesBox.list[1].disableInteractive();
		this.bonusesBox.list[1].animateItem();
	}

	setBgMusicForThisScene() {
		emitter.emit(G.BG_MUSIC_CHANGE, 'gameSound');
		// this.timer = this.time.addEvent({
		// 	delay: 300,
		// 	callback: function () {
		// 		emitter.emit(G.BG_MUSIC_CHANGE, 'gameSound');
		// 	}.bind(this),
		// })
	}

	clickButtonHome() {
		emitter.emit(G.BG_MUSIC_STOP);
		emitter.emit(G.PLAY_SOUND, 'touchSound');

		this.deleteCustomEvents();
		this.resetData();

		this.scene.start('Title');
		document.querySelector('body').setAttribute('class', '_titleScreen');
	}
	deleteCustomEvents() {
		delete emitter._events.scoreUpdated;
	}

	resetData() {
		this.winCount = this.startWinCount;
		this.dynamicSpeedAddNewBox = 3500;
		this.deltaTimeLevelUp = 0;
	}

	// method to select a box
	selectBox(event) {
		// Если бонус- молоток не активен, тогда стандартный режим
		//	Если активен - тогда режим разбивания блоков
		if (!this.isHammerActive) {
			// did we select less than 2 boxes?
			if (this.selectedBoxes.length < 2) {

				// loop through all bodies
				for (let body = this.world.getBodyList(); body; body = body.getNext()) {

					// loop through all fixtures
					for (let fixture = body.getFixtureList(); fixture; fixture = fixture.getNext()) {

						// if the fixture contains the input coordinate...
						if (fixture.testPoint(new planck.Vec2(toMeters(event.x), toMeters(event.y)))) {

							// get body userData
							let userData = body.getUserData();

							// if the body is dynamic and covered
							if (body.isDynamic() && userData.covered) {

								// Проигрываем звук прикосновения к блоку
								emitter.emit(G.PLAY_SOUND, 'touchBlock');

								// show actual box face
								userData.sprite.setFrame(userData.value);

								// the box is no longer covered
								userData.covered = false;

								// push the box in selectedBoxes array
								this.selectedBoxes.push(body);

								// does selectedBoxes array contain two boxes?
								if (this.selectedBoxes.length == 2) {

									// wait 1/2 seconds
									this.time.addEvent({

										// event delay, in milliseconds
										delay: 500,

										// callback function
										callback: () => {

											// get userData of both boxes
											let userData = [this.selectedBoxes[0].getUserData(), this.selectedBoxes[1].getUserData()];

											// do boxes have the same value?
											if (userData[0].value == userData[1].value) {

												emitter.emit(G.PLAY_SOUND, 'crashBox', 0.3);

												emitter.emit(G.UP_POINTS, this.winCount);
												this.currentWin += this.winCount;

												// destroy the sprites
												userData[0].sprite.destroy();
												userData[1].sprite.destroy();

												// destroy the bodies
												this.world.destroyBody(this.selectedBoxes[0]);
												this.world.destroyBody(this.selectedBoxes[1]);

											}

											// do boxes have different values?
											else {

												// hide boxes images
												userData[0].sprite.setFrame(10);
												userData[1].sprite.setFrame(10);

												// set boxes as covered
												userData[0].covered = true;
												userData[1].covered = true;
											}

											// empty selectedBoxes array
											this.selectedBoxes = [];
										}
									})
								}
							}
						}
					}
				}
			}
		} else {
			if (this.selectedBoxes.length < 2) {

				// loop through all bodies
				for (let body = this.world.getBodyList(); body; body = body.getNext()) {

					// loop through all fixtures
					for (let fixture = body.getFixtureList(); fixture; fixture = fixture.getNext()) {

						// if the fixture contains the input coordinate...
						if (fixture.testPoint(new planck.Vec2(toMeters(event.x), toMeters(event.y)))) {

							// get body userData
							let userData = body.getUserData();

							// if the body is dynamic and covered
							if (body.isDynamic() && userData.covered) {

								// Проигрываем звук прикосновения к блоку
								emitter.emit(G.PLAY_SOUND, 'hammerSound');

								emitter.emit(G.UP_POINTS, this.winCount);
								this.currentWin += this.winCount;

								// the box is no longer covered
								userData.covered = false;

								// destroy the sprites
								userData.sprite.destroy();

								// destroy the bodies
								this.world.destroyBody(body);

								this.bonusesBox.list[1].removeAnimateItem();
								this.isHammerActive = false;
							}
						}
					}
				}
			}

		}
	}

	scoreUpdate() {
		this.scoreBox.scoreUpdate();
	}

	checkTimeGameAndUpLevel(deltaTime) {

		if (this.deltaTimeLevelUp > this.timeLevelUp && this.dynamicSpeedAddNewBox > 1500) {
			console.log('LevelUp');
			this.deltaTimeLevelUp = 0;
			this.winCount += 5;
			this.dynamicSpeedAddNewBox -= 500;

			// Меняем задержку в таймере
			this.timerBox.delay = this.dynamicSpeedAddNewBox;
		} else if (this.dynamicSpeedAddNewBox > 1500) {
			this.deltaTimeLevelUp += deltaTime;
		}
	}

	update(time, deltaTime) {
		this.gameTime = time;

		// Каждый определенный отрезок увеличиваем скорость игры
		this.checkTimeGameAndUpLevel(deltaTime);

		// advance the simulation by 1/30 seconds
		if (this.timeCount <= this.startTime && !this.isHammerActive) {
			if (this.timeAfterUseHoldBonus < this.maxTimeHoldBonus && this.isSnowBonusActive) {
				this.timeAfterUseHoldBonus += deltaTime;
			} else if (this.timeAfterUseHoldBonus >= this.maxTimeHoldBonus && this.isSnowBonusActive) {
				this.isSnowBonusActive = false;
				this.timeAfterUseHoldBonus = 0;
			}
			this.world.step(1 / 30);

			// crearForces  method should be added at the end on each step
			this.world.clearForces();

			// iterate through all bodies
			for (let body = this.world.getBodyList(); body; body = body.getNext()) {

				// get body position
				let bodyPosition = body.getPosition();

				// get body angle, in radians
				let bodyAngle = body.getAngle();

				// get body user data, the graphics object
				let userData = body.getUserData();

				// adjust graphic object position and rotation
				userData.sprite.x = toPixels(bodyPosition.x);
				userData.sprite.y = toPixels(bodyPosition.y);
				userData.sprite.rotation = bodyAngle;

				// Сценарий окончания игры - проигрыша
				// Проверяем что тип тела динамический и скосрость практически нулевая, значит кубик не падает 
				// и если после оставновки кубик находится в самом верху - значит поле заполнено
				// Такжу проверяем что толкьо что не был использован бонус - заморозка (иначе срабатывает данная проверка)
				if (
					body.m_type === "dynamic" &&
					body.c_velocity.v.y < 0.1 &&
					userData.sprite.y < 50 &&
					userData.sprite.y > 10 &&
					!this.isSnowBonusActive
				) {
					this.scene.start('FinalScene', { score: this.currentWin });
					this.currentWin = 0;
					emitter.emit(G.BG_MUSIC_STOP);
				}
			}
		} else {
			this.timeCount -= deltaTime;
		}

		this.checkUseHoldBonus();
	}

	checkUseHoldBonus() {
		if (this.isSnowBonusActive && this.bonusesBox.list[0].alpha === 1) {
			this.bonusesBox.list[0].holdItem(this.maxTimerHoldCount);
			console.log('USE HOLD');
		} else if (!this.isSnowBonusActive && this.bonusesBox.list[0].alpha < 1) {
			console.log('IS STOP HOLD');
			this.bonusesBox.list[0].removeHoldItem();
		}
	}
}