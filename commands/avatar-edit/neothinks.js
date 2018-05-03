const commando = require('discord.js-commando');
const { createCanvas, loadImage, registerFont } = require('canvas');
const snekfetch = require('snekfetch');
const { randomRange } = require('../../assets/util/Util');
const path = require('path');
registerFont(path.join(__dirname, '..', '..', 'assets', 'fonts', 'Noto-Regular.ttf'), { family: 'Noto' });
registerFont(path.join(__dirname, '..', '..', 'assets', 'fonts', 'Noto-CJK.otf'), { family: 'Noto' });
registerFont(path.join(__dirname, '..', '..', 'assets', 'fonts', 'Noto-Emoji.ttf'), { family: 'Noto' });

module.exports = class NeoThinksCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'neo',
			aliases: ['nt'],
			group: 'avatar-edit',
			memberName: 'neo',
			description: 'Draws a user\'s avatar on a neo thinks image.',
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
            const base = await loadImage(path.join(__dirname, '..', '..', 'assets', 'images', 'neo.png'));
			const { body } = await snekfetch.get(avatarURL);
			const avatar = await loadImage(body);
			const canvas = createCanvas(base.width, base.height);
			const ctx = canvas.getContext('2d');
			ctx.fillStyle = 'white';
			ctx.fillRect(0, 0, base.width, base.height);
			ctx.drawImage(avatar, 57, 220, 445, 348);
			ctx.drawImage(base, 0, 0);
			return message.channel.send({ files: [{ attachment: canvas.toBuffer(), name: 'neo.png' }] });
		} catch (err) {
			return message.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
		}
	}
};