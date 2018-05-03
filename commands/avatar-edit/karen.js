const commando = require('discord.js-commando');
const { createCanvas, loadImage } = require('canvas');
const snekfetch = require('snekfetch');
const path = require('path');

module.exports = class LookWhatKarenHaveCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'karen',
			aliases: ['karen-has', 'karen-have'],
			group: 'avatar-edit',
			memberName: 'karen',
			description: 'Draws a user\'s avatar over Karen\'s piece of paper.',
			throttling: {
				usages: 1,
				duration: 10
			},
			clientPermissions: ['ATTACH_FILES'],
			args: [
				{
					key: 'user',
					prompt: 'Which user would you like to edit the avatar of?',
					type: 'user',
					default: message => message.author
				}
			]
		});
	}

	async run(message, { user }) {
		const avatarURL = user.displayAvatarURL;
		try {
			const base = await loadImage(path.join(__dirname, '..', '..', 'assets', 'images', 'look-what-karen-have.png'));
			const { body } = await snekfetch.get(avatarURL);
			const avatar = await loadImage(body);
			const canvas = createCanvas(base.width, base.height);
			const ctx = canvas.getContext('2d');
			ctx.fillStyle = 'white';
			ctx.fillRect(0, 0, base.width, base.height);
			ctx.rotate(-6.5 * (Math.PI / 180));
			ctx.drawImage(avatar, 514, 50, 512, 512);
			ctx.rotate(6.5 * (Math.PI / 180));
			ctx.drawImage(base, 0, 0);
			return message.channel.send({ files: [{ attachment: canvas.toBuffer(), name: 'look-what-karen-have.png' }] });
		} catch (err) {
			return message.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
		}
	}
};