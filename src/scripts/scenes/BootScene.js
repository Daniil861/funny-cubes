import bg_2 from '../../assets/sprites/other/bg-2.jpg';

export default class BootScene extends Phaser.Scene {
	constructor() {
		super('Boot');
	}
	preload() {
		this.load.image('bg-2', bg_2);
	}
	create() {
		document.querySelector('body').setAttribute('class', '_preloader');
		this.scene.start('Preload');
		// if (!sessionStorage.getItem('privacy')) {
		// 	this.scene.start('Privacy');
		// } else {
		// 	this.scene.start('Preload');
		// }
	}
}