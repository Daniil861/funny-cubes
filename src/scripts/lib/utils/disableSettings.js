
import { model } from '../../../index.js';
window.addEventListener('load', () => {
	// Действия, когда пользователь сворачивает страницу - преостанавливаем игру
	document.addEventListener('visibilitychange', function () {
		// console.log('model.isMusicPlayBeforeHidePage', model.isMusicPlayBeforeHidePage);

		if (document.visibilityState === 'hidden') {
			model.isMusicPlayBeforeHidePage = model.musicOn;
			if (model.musicOn) {
				model.musicOn = false;
			}
		}
		if (document.visibilityState !== 'hidden' && model.isMusicPlayBeforeHidePage) {
			model.musicOn = true;
		}
	});
})



