const commando = require('discord.js-commando');
const { createCanvas, loadImage } = require('canvas');
const snekfetch = require('snekfetch');
const path = require('path');

module.exports = class TheUltimateTattooCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'tattoo',
			aliases: ['ultimate-tattoo'],
			group: 'avatar-edit',
			memberName: 'tattoo',
			description: 'Draws a user\'s avatar as "The Ultimate Tattoo".',
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
			const base = await loadImage(path.join(__dirname, '..', '..', 'assets', 'images', 'the-ultimate-tattoo.png'));
			const { body } = await snekfetch.get(avatarURL);
			const avatar = await loadImage(body);
			const canvas = createCanvas(base.width, base.height);
			const ctx = canvas.getContext('2d');
			ctx.drawImage(base, 0, 0);
			ctx.rotate(-10 * (Math.PI / 180));
			ctx.drawImage(avatar, 84, 690, 300, 300);
			ctx.rotate(10 * (Math.PI / 180));
			return message.channel.send({ files: [{ attachment: canvas.toBuffer(), name: 'the-ultimate-tattoo.png' }] });
		} catch (err) {
			return message.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
		}
	}
};