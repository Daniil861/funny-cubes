import { model } from '../../../../index.js';

import BonusGameItem from './BonusGameItem.js';

export default class BonusesContainer extends Phaser.GameObjects.Container {
	constructor(params) {
		super(params.scene);
		this.scene = params.scene;

		this.createSnowBonus();

		this.createHummerBonus();

		this.x = this.snowBonus.width / 2;

		this.add([this.snowBonus, this.hummerBonus]);

		this.scene.add.existing(this);
	}

	createSnowBonus() {
		this.snowBonus = new BonusGameItem({ scene: this.scene, texture: 'snow', count: model.hold });
	}

	createHummerBonus() {
		this.hummerBonus = new BonusGameItem({ scene: this.scene, texture: 'hammer', count: model.hummer });
		this.hummerBonus.y = this.snowBonus.y + this.snowBonus.height + 10;
	}
}