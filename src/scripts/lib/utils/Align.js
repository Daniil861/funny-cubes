import { config } from '../../../index.js';

export default class Align {

	// Смысл в следующем - если мы хотим размер какого-то игрового объекта сделать относительным от размера сцены, 
	// передаем в данный метод этот объект и процент, на который этот объект должен отображаться 

	static scaleToGameW(obj, per) {
		obj.displayWidth = config.width * per;
		obj.scaleY = obj.scaleX; // вызываем перерисовку данного объекта
	}

	static center(obj) {
		obj.x = config.width / 2;
		obj.y = config.height / 2;
	}

	static centerH(obj) {
		obj.x = config.width / 2;
	}

	static centerV(obj) {
		obj.y = config.height / 2;
	}

	static cover(scene, frame) {

		// Получаем размеры окна (которые изначально заданы в настройках игры)
		const gameWidth = config.width;
		const gameHeight = config.height;

		// Получаем размеры картинки
		const bg = scene.textures.get(frame).getSourceImage();
		const bgWidth = bg.width;
		const bgHeight = bg.height;

		// Определияем коэффициент масштабирования:
		const scale = Math.max(gameWidth / bgWidth, gameHeight / bgHeight);

		// Возвращаем новые размеры картинки с учетом коэффициента масштабирования
		return {
			newBgWidth: bgWidth * scale,
			newBgHeight: bgHeight * scale
		}
	}

	static yCenterInContainer(object, container) {
		return object.y + container.height / 2 - object.displayHeight / 2;
	}
	static xCenterInContainer(object, container) {
		return object.x + container.width / 2 - object.displayWidth / 2;
	}
}