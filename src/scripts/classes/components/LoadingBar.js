import { config } from '../../../index';

export default class LoadingBar {
	constructor(scene) {
		this.scene = scene;
		this.style = {
			boxColor: 0x778899,
			barColor: 0xfed85f,
			width: config.width * 0.7,
			height: config.height / 20,
		}

		this.x = config.width / 2 - this.style.width / 2;
		this.y = config.height - 100;

		this.progressBox = this.scene.add.graphics();
		this.progressBar = this.scene.add.graphics();

		this.text = this.scene.add.text(this.x + this.style.width / 2, this.y + this.style.height / 2, '0%', {
			fontSize: '30px',
			fontFamily: 'June_Bug'
		})
		this.text.setOrigin(0.5, 0.5);


		this.showProgressBox();

		this.setEvents();
	}

	setEvents() {
		this.scene.load.on('progress', this.showProgressBar, this);
		this.scene.load.on('complete', this.onLoadComplete, this);
	}

	showProgressBox() {
		this.progressBox
			.fillStyle(this.style.boxColor)
			.fillRoundedRect(this.x, this.y, this.style.width, this.style.height, 10);
	}


	showProgressBar(value) {
		this.progressBar
			.clear()
			.fillStyle(this.style.barColor)
			.fillRoundedRect(this.x, this.y, this.style.width * value, this.style.height, 10);

		this.text.setText(`${Math.floor(value * 100)}%`);
	}

	onLoadComplete() {
		this.progressBar.destroy();
		this.progressBox.destroy();
		this.text.destroy();
	}
}