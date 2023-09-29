import { config } from '../../../index.js';

export default class AlignGrid {
	constructor(params) {
		this.config = params;
		this.isVisible = false;

		// Защита от ошибки
		if (!params.scene) {
			console.log('missing scene');
			return;
		}
		if (!params.rows) {
			this.config.rows = 5;
		}
		if (!params.cols) {
			this.config.cols = 5;
		}
		if (!params.width) {
			this.config.width = config.width;
		}
		if (!params.height) {
			this.config.height = config.height;
		}
		this.scene = params.scene;

		// Размер ячейки по горизонтали
		this.cw = this.config.width / this.config.cols;

		// Размер ячейки по вертикали
		this.ch = this.config.height / this.config.rows;
	}

	show() {
		this.graphics = this.scene.add.graphics();
		this.graphics.lineStyle(2, 0xff0000);

		for (let i = 0; i < this.config.width; i += this.cw) {
			this.graphics.moveTo(i, 0);
			this.graphics.lineTo(i, this.config.height);
		}
		for (let i = 0; i < this.config.height; i += this.ch) {
			this.graphics.moveTo(0, i);
			this.graphics.lineTo(this.config.width, i);
		}
		this.graphics.strokePath();
	}

	// Размещаем по координатам сетки
	placeAt(xx, yy, obj) {
		// рассчитываем позицию объекта на основании cellwidth и cellheight
		const x2 = this.cw * xx + this.cw / 2;
		const y2 = this.ch * yy + this.ch / 2;

		obj.x = x2;
		obj.y = y2;
	}

	// Размещаем по одному индексу - порядковому номеру ячейки, если считать подряд
	placeAtIndex(index, obj) {
		const yy = Math.floor(index / this.config.cols);
		const xx = index - (yy * this.config.cols);

		this.placeAt(xx, yy, obj);
	}

	// Для индикации ячеек по индексам - добавим номера в каждую ячейку (чтобы удобно было сразу глянуть номер и указать в метод индекс)
	createNumbers() {
		this.show();
		this.arrowNumbers = [];
		let count = 0;
		for (let i = 0; i < this.config.rows; i++) {
			for (let j = 0; j < this.config.cols; j++) {
				this.numText = this.scene.add.text(0, 0, count, { color: '#fff', fontSize: '20px' });
				this.numText.setOrigin(0.5);
				this.placeAtIndex(count, this.numText);
				count++;
				this.arrowNumbers.push(this.numText);
			}
		}
	}

	showNumbers() {
		this.isVisible = true;
		this.graphics.alpha = 1;

		this.arrowNumbers.forEach(number => {
			number.setAlpha(1);
		})
	}
	hideNumbers() {
		this.isVisible = false;
		this.graphics.alpha = 0;

		this.arrowNumbers.forEach(number => {
			number.setAlpha(0);
		})
	}
}