import { config } from "../..";

export default class PrivacyScene extends Phaser.GameObjects.Container {
	constructor(params) {
		super(params.scene);

		this.config = {
			nameGame: 'Visit Book', // имя проекта
			x: 0, // координата слева расположения контейнера
			y: 0, // координата сверху расположения контейнера
			xOffset: 10, // задаем отступ текста слева
			yOffset: 50, // задаем отступ текста сверху
			bottomOffset: 100, // задаем отступ текста снизу, 100 - получится 50 px отступ, так как от 100 нужно отнимать отступ сверху yOffset
			mouseScrollSpeed: 30, // задаем скорость прокрутки колесом
			widthOffset: 10 // задаем отклонение блока с текстом от правого края экрана
		}
		this.style = {
			font: '36px Arco',
			color: '#fff',
			wordWrap: { width: config.width - this.config.widthOffset }
		}
		this.cnt_1 = [
			'Privacy Policy',
			'Last Modified 1 February 2021',
			'Privacy Policy is updated in accordance with The General Data Protection Regulation (GDPR).',
			' ',
			'1. Introduction',
			`This is Privacy Policy ${this.config.nameGame}, which explains how is collect, use and share data through mobile applications, our pages or presence on third party websites and other platforms,`,
			` websites products, offers and Services that we offer from time to time, all of which together we refer as “Services” or “Service”.`
			,
			' ',
		]
		this.cnt_2 = [
			'2. Collect of Personal Data',
			`${this.config.nameGame} collects and process through the mobile applications the Player's personal data.`,
			`Personal data means any information from which the player can be directly or indirectly identified such as a name, location, email address,`,
			`communication language, IP address, IDFV (ID for vendor) or Android ID, advertisement ID, push notifications token, game history, network logs, cookie online identifier, gender, financial data, etc., (“Personal Data”).`,
			`Your personal data are processed only to the extent strictly necessary, depending on the particular purpose of the processing, as defined in point 6.`
			,
			' ',
		]
		this.cnt_3 = [
			'3. Acceptance and Consent',
			`3.1 Read this Notice carefully before using the ${this.config.nameGame}. By using or registering via the apps, or submitting a query to the Company via the Apps or other means,`,
			`including telephone or mail, you accept this notice. If you do not accept this Notice, please don't use the ${this.config.nameGame}.`,
			`3.2 By registering for a user account that enables you to use the service, you agree to the terms and conditions of this Privacy Policy, and you consent to the collection,`,
			`use and disclosure of your information by ${this.config.nameGame} in accordance with the terms and conditions of this Privacy Policy.`,
			`If you do not agree to the terms and conditions of this Privacy Policy or If you do not want ${this.config.nameGame} to collect, store, use or share your information in the ways described in this Privacy Policy`,
			`please do not use the service.`,
			' ',
		]
		this.cnt_4 = [
			'4. Changes to the Privacy Policy',
			`${this.config.nameGame} reserves the right to change, modify, add, or remove portions of this Privacy Policy at any time, for example to reflect updates to the Service or to reflect changes in the law.`,
			`If we make a material change to the Privacy Policy, we will provide you with appropriate notice and will seek your consent to the updated Privacy Policy in accordance with applicable legal requirements.`,
			`Please check this Privacy Policy periodically for those changes. Your continued use of the Service after the posting of changes constitutes your binding acceptance of such changes.`
			,
			' ',
		]
		this.cnt_5 = [
			'5. Information Collection and Use',
			`Our primary goals in collecting and using information are to provide and improve the Service, to administer and assist you in administering your Account on the Service,`,
			`and to provide you with a better experience with the service.`,
			`We process your personal data for the following specified purposes:`,
			'Provision of Services',
			'Negotiations on a contractual relationship',
			'Purposes contained within the data subject\'s consent',
			'Archiving based on legal regulations',
			'Direct marketing',
			'Customer service quality monitoring',
			'Collect feedback from the market'
			,
			' ',
		]
		this.cnt_6 = [
			'6. Which Personal Data we collect',
			`Data you provide to us: Contact information (such as full name and email address), profile information (such as age or gender or photograph), your messages to the Service (such as chat logs and player support tickets),`,
			`other data you choose to give us.`,
			`Data we collect automatically: Data about your account and in-game progress, your IP address and mobile device identifiers (such as your device ID, advertising ID), data about your device, such as device manufacturer,`,
			`model, operating system and language, general location data like country or city name, data about your use of the Service, such as gameplay data and your interactions with other players inside the games.`
			,
			' ',
		]
		this.cnt_7 = [
			'7. Information sharing practices',
			`We do not share any information we collect (including your personal e-mail address) with third parties:`,
			`unless you authorized us to do so under the terms of this Privacy Policy;`,
			`or we believe in good faith that the disclosure of the information is required by any applicable law, regulation, court order, legal proceedings or governmental demand;`,
			`or it is required to handle security breach or fraud investigations, or to enforce the terms of our Terms of Use.`,
			`Otherwise, we share your information with third parties with whom we have a business relationship, such as analytics providers. The information shared with these third parties may be used for industry analysis,`,
			`or other purposes related to providing the Services to you.`,
			,
			' ',
		]
		this.cnt_8 = [
			'8. Cookies',
			`Like many websites, ${this.config.nameGame} and service providers acting on our behalf, like Google Analytics, store log files and use tracking technologies such as "cookies" to collect information`,
			`A cookie is a small data file that is transferred to your computer’s hard disk or your mobile device for record-keeping purposes. The service may send cookies to a computer or a mobile device when a user accesses or views a service.`,
			`Information contained in a cookie may be linked to personal information for purposes such as improving the quality of ${this.config.nameGame} Service, tailoring recommendations to interests, and making the Service easier to use.`,
			`Cookies can be disabled at any time by changing your web browser’s options to stop accepting cookies, to prompt you before accepting a cookie from the websites you visit, or limit the type of cookies you allow.`,
			`Flash cookies operate differently than browser cookies, and cookie management tools available in a web browser may not remove flash cookies. If you do not accept cookies, however, you may not be able to use all features,`,
			`portions or functionalities of the Service.`
			,
			' ',
		]
		this.cnt_9 = [
			'9. Personal data retention period',
			`We keep your personal data for as long, as you actively use our Services, but no later than the expiration of the statutory accounting and tax laws. After the retention time, your personal information will be completely erased.`
			,
			' ',
		]
		this.cnt_10 = [
			'10. Protect the information',
			`${this.config.nameGame} has made reasonable technical and organizational measures designed to secure your information both online and offline from accidental loss and from unauthorized access, use, alteration or disclosure,`,
			`and we are committed to the protection of customer information. We will take reasonable steps to ensure that your data is treated securely and in accordance with this Privacy Policy.`,
			`While we take reasonable precautions against possible security breaches of our Services and our customer databases and records, no website or Internet transmission is completely secure,`,
			`and ${this.config.nameGame} cannot guarantee that unauthorized access, hacking, data loss, or other breaches will never occur and that third parties will never be able to overcome those measures or use your personal information for improper purposes.`
			,
			' ',
		]
		this.cnt_11 = [
			'11. The rights of user',
			`You are entitled to obtain information from us on how we handle your personal data, to see copies of all personal data held by us and to request that your personal data is amended, corrected or deleted from our systems. You can also limit,`,
			`restrict or object to the processing of your data. We do not carry out any decision-making based solely on automated processing, including profiling. You can object to our use of your personal data where we stated we rely on our legitimate`,
			`business interests to do so. We explained the legitimate interests we rely on in sections ‘Why do we collect your personal data’ above. If you would like to exercise any of your above rights, contact us using the contact details below.`
			,
			' ',
		]
		this.cnt_12 = [
			'12. Age requirement',
			`We recognize the need to provide further privacy protections with respect to Personal Information we may collect from children, and take many special precautions to protect the privacy of children.`,
			`We do not require any Personal Information from them at any time. Likewise, we encourage children to consult with their parents before submitting any information to any online resource. Likewise,`,
			`we believe parents should be involved in the online activities of their children and suggest that parents do their best to provide their children with a safe and friendly online environment.`,
			`You must be at least 18 years old to use the ${this.config.nameGame}. By accepting the terms of this Privacy Policy and the Terms of Use presented to you before downloading or presenting the Software and while using it,`,
			`you represent that you are 18 years old. We will not knowingly collect personal information from a user who is younger than 18 years old and, if we have reason to believe that you are younger than 18 years old,`,
			`we will delete your information from our servers.`
		]

		this.create();
	}
	create() {
		this.createGraphics();
		this.createMask();
		this.createText();
		this.createTextoffsets();
		this.textSetMask()
		this.createZone();
		this.createEventsZone();
	}
	createGraphics() {
		this.graphics = this.scene.make.graphics();

		this.graphics.fillRect(this.config.x + this.config.xOffset, this.config.y + this.config.yOffset, config.width, config.height - this.config.bottomOffset);
	}
	createMask() {
		this.mask = new Phaser.Display.Masks.GeometryMask(this.scene, this.graphics);
	}
	createText() {
		this.text_1 = this.scene.add.text(this.config.x + this.config.xOffset, this.config.y + this.config.yOffset, this.cnt_1, this.style);

		// Для каждого текстового блока определяем расстояние, на котором он должен быть размещен 
		this.txtHeight_2 = this.config.y + this.config.yOffset + this.text_1.height;

		this.text_2 = this.scene.add.text(this.config.x + this.config.xOffset, this.txtHeight_2, this.cnt_2, this.style);

		this.txtHeight_3 = this.txtHeight_2 + this.text_2.height;

		this.text_3 = this.scene.add.text(this.config.x + this.config.xOffset, this.txtHeight_3, this.cnt_3, this.style);

		this.txtHeight_4 = this.txtHeight_3 + this.text_3.height;

		this.text_4 = this.scene.add.text(this.config.x + this.config.xOffset, this.txtHeight_4, this.cnt_4, this.style);

		this.txtHeight_5 = this.txtHeight_4 + this.text_4.height;

		this.text_5 = this.scene.add.text(this.config.x + this.config.xOffset, this.txtHeight_5, this.cnt_5, this.style);

		this.txtHeight_6 = this.txtHeight_5 + this.text_5.height;

		this.text_6 = this.scene.add.text(this.config.x + this.config.xOffset, this.txtHeight_6, this.cnt_6, this.style);

		this.txtHeight_7 = this.txtHeight_6 + this.text_6.height;

		this.text_7 = this.scene.add.text(this.config.x + this.config.xOffset, this.txtHeight_7, this.cnt_7, this.style);

		this.txtHeight_8 = this.txtHeight_7 + this.text_7.height;

		this.text_8 = this.scene.add.text(this.config.x + this.config.xOffset, this.txtHeight_8, this.cnt_8, this.style);

		this.txtHeight_9 = this.txtHeight_8 + this.text_8.height;

		this.text_9 = this.scene.add.text(this.config.x + this.config.xOffset, this.txtHeight_9, this.cnt_9, this.style);

		this.txtHeight_10 = this.txtHeight_9 + this.text_9.height;

		this.text_10 = this.scene.add.text(this.config.x + this.config.xOffset, this.txtHeight_10, this.cnt_10, this.style);

		this.txtHeight_11 = this.txtHeight_10 + this.text_10.height;

		this.text_11 = this.scene.add.text(this.config.x + this.config.xOffset, this.txtHeight_11, this.cnt_11, this.style);

		this.txtHeight_12 = this.txtHeight_11 + this.text_11.height;

		this.text_12 = this.scene.add.text(this.config.x + this.config.xOffset, this.txtHeight_12, this.cnt_12, this.style);
	}
	createTextoffsets() {
		// Для каждого текстового блока рассчитываем максимальную высоту, на которую он может отклониться вверх
		let textHeight_1 = this.text_1.height + this.text_2.height + this.text_3.height + this.text_4.height + this.text_5.height + this.text_6.height + this.text_7.height + this.text_8.height + this.text_9.height + this.text_10.height + this.text_11.height + this.text_12.height;
		let textHeight_2 = this.text_2.height + this.text_3.height + this.text_4.height + this.text_5.height + this.text_6.height + this.text_7.height + this.text_8.height + this.text_9.height + this.text_10.height + this.text_11.height + this.text_12.height;
		let textHeight_3 = this.text_3.height + this.text_4.height + this.text_5.height + this.text_6.height + this.text_7.height + this.text_8.height + this.text_9.height + this.text_10.height + this.text_11.height + this.text_12.height;
		let textHeight_4 = this.text_4.height + this.text_5.height + this.text_6.height + this.text_7.height + this.text_8.height + this.text_9.height + this.text_10.height + this.text_11.height + this.text_12.height;
		let textHeight_5 = this.text_5.height + this.text_6.height + this.text_7.height + this.text_8.height + this.text_9.height + this.text_10.height + this.text_11.height + this.text_12.height;
		let textHeight_6 = this.text_6.height + this.text_7.height + this.text_8.height + this.text_9.height + this.text_10.height + this.text_11.height + this.text_12.height;
		let textHeight_7 = this.text_7.height + this.text_8.height + this.text_9.height + this.text_10.height + this.text_11.height + this.text_12.height;
		let textHeight_8 = this.text_8.height + this.text_9.height + this.text_10.height + this.text_11.height + this.text_12.height;
		let textHeight_9 = this.text_9.height + this.text_10.height + this.text_11.height + this.text_12.height;
		let textHeight_10 = this.text_10.height + this.text_11.height + this.text_12.height;
		let textHeight_11 = this.text_11.height + this.text_12.height;
		let textHeight_12 = this.text_12.height;

		this.minY_1 = config.height - textHeight_1 - this.config.bottomOffset;
		this.minY_2 = config.height - textHeight_2 - this.config.bottomOffset;
		this.minY_4 = config.height - textHeight_4 - this.config.bottomOffset;
		this.minY_5 = config.height - textHeight_5 - this.config.bottomOffset;
		this.minY_3 = config.height - textHeight_3 - this.config.bottomOffset;
		this.minY_6 = config.height - textHeight_6 - this.config.bottomOffset;
		this.minY_7 = config.height - textHeight_7 - this.config.bottomOffset;
		this.minY_8 = config.height - textHeight_8 - this.config.bottomOffset;
		this.minY_9 = config.height - textHeight_9 - this.config.bottomOffset;
		this.minY_10 = config.height - textHeight_10 - this.config.bottomOffset;
		this.minY_11 = config.height - textHeight_11 - this.config.bottomOffset;
		this.minY_12 = config.height - textHeight_12 - this.config.bottomOffset;
	}
	textSetMask() {
		this.text_1.setMask(this.mask);
		this.text_2.setMask(this.mask);
		this.text_3.setMask(this.mask);
		this.text_4.setMask(this.mask);
		this.text_5.setMask(this.mask);
		this.text_6.setMask(this.mask);
		this.text_7.setMask(this.mask);
		this.text_8.setMask(this.mask);
		this.text_9.setMask(this.mask);
		this.text_10.setMask(this.mask);
		this.text_11.setMask(this.mask);
		this.text_12.setMask(this.mask);
	}
	createZone() {
		this.zone = this.scene.add.zone(this.config.x, this.config.y, config.width - 10, config.height)
			.setOrigin(0)
			.setInteractive({ useHandCursor: true, draggable: true });
		this.scene.input.dragDistanceThreshold = 100;
	}
	createEventsZone() {
		this.zone.on('drag', this.onZoneDrag, this);
		this.zone.on('dragend', this.onZoneDragEnd, this);
		this.zone.on('wheel', this.onZoneWheel, this);
		this.zone.on('wheelend', this.onZoneWheelEnd, this);
	}
	onZoneDrag(pointer) {
		let y = this.config.y;
		if (pointer.isDown) {
			this.text_1.y += pointer.velocity.y / 2;
			this.text_1.y = Phaser.Math.Clamp(this.text_1.y, this.minY_1, y + this.config.yOffset);

			this.text_2.y += pointer.velocity.y / 2;
			this.text_2.y = Phaser.Math.Clamp(this.text_2.y, this.minY_2, this.txtHeight_2);

			this.text_3.y += pointer.velocity.y / 2;
			this.text_3.y = Phaser.Math.Clamp(this.text_3.y, this.minY_3, this.txtHeight_3);

			this.text_4.y += pointer.velocity.y / 2;
			this.text_4.y = Phaser.Math.Clamp(this.text_4.y, this.minY_4, this.txtHeight_4);

			this.text_5.y += pointer.velocity.y / 2;
			this.text_5.y = Phaser.Math.Clamp(this.text_5.y, this.minY_5, this.txtHeight_5);

			this.text_6.y += pointer.velocity.y / 2;
			this.text_6.y = Phaser.Math.Clamp(this.text_6.y, this.minY_6, this.txtHeight_6);

			this.text_7.y += pointer.velocity.y / 2;
			this.text_7.y = Phaser.Math.Clamp(this.text_7.y, this.minY_7, this.txtHeight_7);

			this.text_8.y += pointer.velocity.y / 2;
			this.text_8.y = Phaser.Math.Clamp(this.text_8.y, this.minY_8, this.txtHeight_8);

			this.text_9.y += pointer.velocity.y / 2;
			this.text_9.y = Phaser.Math.Clamp(this.text_9.y, this.minY_9, this.txtHeight_9);

			this.text_10.y += pointer.velocity.y / 2;
			this.text_10.y = Phaser.Math.Clamp(this.text_10.y, this.minY_10, this.txtHeight_10);

			this.text_11.y += pointer.velocity.y / 2;
			this.text_11.y = Phaser.Math.Clamp(this.text_11.y, this.minY_11, this.txtHeight_11);

			this.text_12.y += pointer.velocity.y / 2;
			this.text_12.y = Phaser.Math.Clamp(this.text_12.y, this.minY_12, this.txtHeight_12);
		}
	}
	onZoneDragEnd() {
		this.zone.x = this.config.x;
		this.zone.y = this.config.y - 3;
	}
	onZoneWheel(pointer) {
		let y = this.config.y;
		let mouseScrollSpeed = this.config.mouseScrollSpeed;
		if (pointer.deltaY <= 0) {
			this.text_1.y += mouseScrollSpeed;
			this.text_1.y = Phaser.Math.Clamp(this.text_1.y, this.minY_1, y + this.config.yOffset);

			this.text_2.y += mouseScrollSpeed;
			this.text_2.y = Phaser.Math.Clamp(this.text_2.y, this.minY_2, this.txtHeight_2);

			this.text_3.y += mouseScrollSpeed;
			this.text_3.y = Phaser.Math.Clamp(this.text_3.y, this.minY_3, this.txtHeight_3);

			this.text_4.y += mouseScrollSpeed;
			this.text_4.y = Phaser.Math.Clamp(this.text_4.y, this.minY_4, this.txtHeight_4);

			this.text_5.y += mouseScrollSpeed;
			this.text_5.y = Phaser.Math.Clamp(this.text_5.y, this.minY_5, this.txtHeight_5);

			this.text_6.y += mouseScrollSpeed;
			this.text_6.y = Phaser.Math.Clamp(this.text_6.y, this.minY_6, this.txtHeight_6);

			this.text_7.y += mouseScrollSpeed;
			this.text_7.y = Phaser.Math.Clamp(this.text_7.y, this.minY_7, this.txtHeight_7);

			this.text_8.y += mouseScrollSpeed;
			this.text_8.y = Phaser.Math.Clamp(this.text_8.y, this.minY_8, this.txtHeight_8);

			this.text_9.y += mouseScrollSpeed;
			this.text_9.y = Phaser.Math.Clamp(this.text_9.y, this.minY_9, this.txtHeight_9);

			this.text_10.y += mouseScrollSpeed;
			this.text_10.y = Phaser.Math.Clamp(this.text_10.y, this.minY_10, this.txtHeight_10);

			this.text_11.y += mouseScrollSpeed;
			this.text_11.y = Phaser.Math.Clamp(this.text_11.y, this.minY_11, this.txtHeight_11);

			this.text_12.y += mouseScrollSpeed;
			this.text_12.y = Phaser.Math.Clamp(this.text_12.y, this.minY_12, this.txtHeight_12);
		} else {
			this.text_1.y -= mouseScrollSpeed;
			this.text_1.y = Phaser.Math.Clamp(this.text_1.y, this.minY_1, y + this.config.yOffset);

			this.text_2.y -= mouseScrollSpeed;
			this.text_2.y = Phaser.Math.Clamp(this.text_2.y, this.minY_2, this.txtHeight_2);

			this.text_3.y -= mouseScrollSpeed;
			this.text_3.y = Phaser.Math.Clamp(this.text_3.y, this.minY_3, this.txtHeight_3);

			this.text_4.y -= mouseScrollSpeed;
			this.text_4.y = Phaser.Math.Clamp(this.text_4.y, this.minY_4, this.txtHeight_4);

			this.text_5.y -= mouseScrollSpeed;
			this.text_5.y = Phaser.Math.Clamp(this.text_5.y, this.minY_5, this.txtHeight_5);

			this.text_6.y -= mouseScrollSpeed;
			this.text_6.y = Phaser.Math.Clamp(this.text_6.y, this.minY_6, this.txtHeight_6);

			this.text_7.y -= mouseScrollSpeed;
			this.text_7.y = Phaser.Math.Clamp(this.text_7.y, this.minY_7, this.txtHeight_7);

			this.text_8.y -= mouseScrollSpeed;
			this.text_8.y = Phaser.Math.Clamp(this.text_8.y, this.minY_8, this.txtHeight_8);

			this.text_9.y -= mouseScrollSpeed;
			this.text_9.y = Phaser.Math.Clamp(this.text_9.y, this.minY_9, this.txtHeight_9);

			this.text_10.y -= mouseScrollSpeed;
			this.text_10.y = Phaser.Math.Clamp(this.text_10.y, this.minY_10, this.txtHeight_10);

			this.text_11.y -= mouseScrollSpeed;
			this.text_11.y = Phaser.Math.Clamp(this.text_11.y, this.minY_11, this.txtHeight_11);

			this.text_12.y -= mouseScrollSpeed;
			this.text_12.y = Phaser.Math.Clamp(this.text_12.y, this.minY_12, this.txtHeight_12);
		}
	}
	onZoneWheelEnd() {
		this.zone.x = this.config.x;
		this.zone.y = this.config.y - 3;
	}
}