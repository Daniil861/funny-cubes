import * as planck from 'planck';
import { toMeters } from './planckUtils';
import Align from '../../lib/utils/Align.js';

// this class extends Phaser Sprite class
export class PhysicsWall extends Phaser.GameObjects.Sprite {

	constructor(scene, world, posX, posY, width, height) {

		super(scene, posX, posY, 'wall');

		// adjust sprite display width and height
		this.displayWidth = width;
		this.displayHeight = height;

		// add sprite to scene
		scene.add.existing(this);

		// this is how we create a generic Box2D body
		let box = world.createBody({
			this: 'static',
			position: planck.Vec2(toMeters(posX), toMeters(posY)),
			userData: {
				sprite: this,
			}
		});

		// a body can have one or more fixtures. This is how we create a box fixture inside a body
		box.createFixture(planck.Box(toMeters(width / 2), toMeters(height / 2)));

		// now we place the body in the world
		// box.setPosition(planck.Vec2(toMeters(posX), toMeters(posY)));

		// time to set mass information
		box.setMassData({

			// body mass
			mass: 1,

			// body center
			center: planck.Vec2(),

			// I have to say I do not know the meaning of this "I", but if you set it to zero, bodies won't rotate
			I: 1
		});

		// a body can have anything in its user data, normally it's used to store its sprite
		// box.setUserData({
		// 	sprite: this,
		// });

	}
}