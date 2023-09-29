import { model } from "../../..";
//===========
// Yandex SDK


export default class SDKYandex {
	constructor(scene) {
		this.scene = scene;

		this.initSDK(model);
	}

	initSDK(model) {
		YaGames
			.init((params) => {
				console.log(params);
				// adv: {
				// 	onClose: wasShown => {
				// 		console.info('adv closed!');
				// 		console.log(model.finalPin);
				// 		if (model.finalPin === 'Title') {
				// 			const activeScene = this.scene.scene.getScenes();
				// 			if (activeScene.length) {
				// 				activeScene[0].scene.start('Title');
				// 			}
				// 		} else if (model.finalPin === 'Start') {
				// 			const activeScene = this.scene.scene.getScenes();
				// 			if (activeScene.length) {
				// 				activeScene[0].scene.start('Start');
				// 			}
				// 		}
				// 	}
				// }
			})
			.then(ysdk => {
				console.log('Запускаем метод создания ysdk');
				ysdk.adv.showFullscreenAdv();
				window.ysdk = ysdk;
				window.ysdk.features.LoadingAPI?.ready(); // Показываем SDK, что игра загрузилась и можно начинать играть
				console.log(ysdk);
			})
			.catch(console.error);
	}
}


// function initSDK() {
// 	YaGames
// 		.init({
// 			adv: {
// 				onAdvClose: wasShown => {
// 					console.info('adv closed!');
// 					FinalScene.goTitleScene();
// 					// location.href = 'index.html';

// 				}
// 			}
// 		})
// 		.then(ysdk => {
// 			ysdk.adv.showFullscreenAdv();
// 			window.ysdk = ysdk;
// 			window.ysdk.features.LoadingAPI?.ready(); // Показываем SDK, что игра загрузилась и можно начинать играть
// 		})
// 		.catch(console.error);
// }
// initSDK();


export function showAd(pin, scene) {

	window.ysdk.adv.showFullscreenAdv({
		callbacks: {
			onClose: () => {
				if (pin === 'Title') {
					// const activeScene = this.scene.scene.getScenes();
					scene.scene.start('Title');
					document.querySelector('body').setAttribute('class', '_titleScreen');
					// const activeScene = scene.scene.getScenes();
					// if (activeScene.length) {
					// 	activeScene[0].scene.start('Title');
					// }
				} else if (pin === 'Start') {
					scene.scene.start('Start');
					document.querySelector('body').setAttribute('class', '_game');
					// const activeScene = this.scene.scene.getScenes();
					// const activeScene = scene.scene.getScenes();
					// if (activeScene.length) {
					// 	activeScene[0].scene.start('Start');
					// }
				}
			}
		}
	})
}

//========================================================================================================================================================
// Первый вариант подключения
// let ysdk;
// YaGames
// 	.init()
// 	.then(ysdk_ => {
// 		ysdk = ysdk_;
// 		ysdk.adv.showFullscreenAdv();

// 		const buttonElems = document.querySelectorAll('[data-btn-advertising]');

// 		buttonElems.forEach(button => {

// 			button.addEventListener('click', () => {

// 				ysdk.adv.showFullscreenAdv({
// 					callbacks: {
// 						onClose: function () {
// 							location.href = 'index.html'
// 						},
// 						// onClose: getCallback('onClose'),
// 						// onOpen: getCallback('onOpen'),
// 						// onError: getCallback('onError'),
// 						// onOffline: getCallback('onOffline')
// 					}
// 				});
// 			});
// 		})
// 	});

///
//========================================================================================================================================================
