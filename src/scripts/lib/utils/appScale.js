let app = {
	centerX: window.innerWidth / 2,
	centerY: window.innerHeight / 2,
	defaultWidth: 1270,
	defaultHeight: 720,
}

app.update = function () {

	this.zoom = window.innerHeight >= 400 ? (window.innerHeight / (app.defaultHeight * 2 / 100)) / 100 : (400 / (app.defaultHeight * 2 / 100)) / 100

	console.log(this.zoom);
	//Если высота больше 400, то высота девайса / дефалт высота *2 / 100 и все разделить на 100
	// пример (500 / 720*2/100) / 100 = (500 / 14,4) / 100 = 0,34

	// Если меньше - (400 / 14,4) / 100 = 0,27

	this.width = window.innerWidth / this.zoom // 700 / 0,34 = 2058
	this.height = window.innerHeight / this.zoom // 500 / 0,34 = 1470



	this.left = this.centerX - this.width / 2
	// console.log(`this.left - ${this.left}`);
	this.top = this.centerY - this.height / 2
	// console.log(`this.top - ${this.top}`);
	this.right = this.centerX + this.width / 2
	// console.log(`this.right - ${this.right}`);
	this.bottom = this.centerY + this.height / 2
	// console.log(`this.bottom - ${this.bottom}`);
}
app.update()

export { app }
