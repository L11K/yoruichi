const commando = require('discord.js-commando');
const { createCanvas, loadImage, registerFont } = require('canvas');
const snekfetch = require('snekfetch');
const { randomRange } = require('../../assets/util/Util');
const path = require('path');
registerFont(path.join(__dirname, '..', '..', 'assets', 'fonts', 'Noto-Regular.ttf'), { family: 'Noto' });
registerFont(path.join(__dirname, '..', '..', 'assets', 'fonts', 'Noto-CJK.otf'), { family: 'Noto' });
registerFont(path.join(__dirname, '..', '..', 'assets', 'fonts', 'Noto-Emoji.ttf'), { family: 'Noto' });

module.exports = class SteamCardCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'wanted',
			aliases: ['wn'],
			group: 'avatar-edit',
			memberName: 'wanted',
			description: 'Draws a user\'s avatar on a wanted poster.',
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
            const wantedAmount = randomRange(1000000, 10000000);
			const base = await loadImage(path.join(__dirname, '..', '..', 'assets', 'images', 'wanted.png'));
			const { body } = await snekfetch.get(avatarURL);
			const avatar = await loadImage(body);
			const canvas = createCanvas(base.width, base.height);
			const ctx = canvas.getContext('2d');
			ctx.fillStyle = 'white';
			ctx.fillRect(0, 0, base.width, base.height);
			ctx.drawImage(avatar, 25, 25, 450, 450);
			ctx.drawImage(base, 0, 0);
			ctx.font = '30px Noto';
            ctx.fillText(user.username, 38, 40);
            ctx.fillText('Amount: $' +wantedAmount, 110, 520);
			return message.channel.send({ files: [{ attachment: canvas.toBuffer(), name: 'wanted.png' }] });
		} catch (err) {
			return message.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
		}
	}
};