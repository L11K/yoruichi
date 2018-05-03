const commando = require('discord.js-commando');
const { createCanvas, loadImage } = require('canvas');
const snekfetch = require('snekfetch');
const path = require('path');
const { drawImageWithTint } = require('../../assets/util/Canvas');

module.exports = class TriggeredCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'triggered',
			group: 'avatar-edit',
			memberName: 'triggered',
			description: 'Draws a user\'s avatar over the "Triggered" meme.',
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
			const base = await loadImage(path.join(__dirname, '..', '..', 'assets', 'images', 'triggered.png'));
			const { body } = await snekfetch.get(avatarURL);
			const avatar = await loadImage(body);
			const canvas = createCanvas(base.width, base.height);
			const ctx = canvas.getContext('2d');
			ctx.fillStyle = 'white';
			ctx.fillRect(0, 0, base.width, base.height);
			drawImageWithTint(ctx, avatar, 'red', 0, 0, 320, 320);
			ctx.drawImage(base, 0, 0);
			return message.channel.send({ files: [{ attachment: canvas.toBuffer(), name: 'triggered.png' }] });
		} catch (err) {
			return message.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
		}
	}
};