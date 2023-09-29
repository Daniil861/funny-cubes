import * as planck from 'planck';
import { toMeters } from './planckUtils';

// this class extends planck Phaser Sprite class
export class PhysicsBox extends Phaser.GameObjects.Sprite {

	constructor(scene, world, posX, posY, width, height, hideAfter, textures) {

		super(scene, posX, posY, textures);

		// adjust sprite display width and height
		this.displayWidth = width;
		this.displayHeight = height;

		// add sprite to scene
		scene.add.existing(this);

		// initial random value
		let randomValue = -1;

		// set a random value
		randomValue = Phaser.Math.Between(0, 9);

		// set a timed event to hide box image
		let timedEvent = scene.time.addEvent({

			// event delay
			delay: hideAfter,

			// optional arguments: the sprite itself
			args: [this],

			// callback function
			callback: () => {

				// set frame to 10 (cover)
				this.setFrame(10);

				// get box user data
				let userData = box.getUserData();

				// set box as covered
				userData.covered = true;
			}
		});

		// this is how we create a generic Box2D body
		let box = world.createBody({
			type: 'dynamic', // Box2D bodies are created as static bodies, but we can make them dynamic
			position: planck.Vec2(toMeters(posX), toMeters(posY)),	// now we place the body in the world
			// gravityScale: 5, // утежеляет тело
			userData: { 	// a body can have anything in its user data, normally it's used to store its sprite
				sprite: this,
				value: randomValue,
				covered: false,
				event: timedEvent
			},
		});

		// a body can have one or more fixtures. This is how we create a box fixture inside a body
		box.createFixture(planck.Box(toMeters(width / 2), toMeters(height / 2)));

		// time to set mass information
		box.setMassData({

			// body mass
			mass: 1,

			// body center
			center: planck.Vec2(),

			// I have to say I do not know the meaning of this "I", but if you set it to zero, bodies won't rotate
			I: 1
		});

		// set sprite frame to randomValue
		this.setFrame(randomValue);

	}
}