const commando = require('discord.js-commando');
const { createCanvas, loadImage, registerFont } = require('canvas');
const snekfetch = require('snekfetch');
const path = require('path');
registerFont(path.join(__dirname, '..', '..', 'assets', 'fonts', 'Noto-Regular.ttf'), { family: 'Noto' });
registerFont(path.join(__dirname, '..', '..', 'assets', 'fonts', 'Noto-CJK.otf'), { family: 'Noto' });
registerFont(path.join(__dirname, '..', '..', 'assets', 'fonts', 'Noto-Emoji.ttf'), { family: 'Noto' });

module.exports = class CardCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'card',
			aliases: ['discord-card'],
			group: 'avatar-edit',
			memberName: 'card',
			description: 'Draws a user\'s avatar on a User Card.',
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
			const base = await loadImage(path.join(__dirname, '..', '..', 'assets', 'images', 'card.png'));
			const { body } = await snekfetch.get(avatarURL);
			const avatar = await loadImage(body);
			const canvas = createCanvas(base.width, base.height);
			const ctx = canvas.getContext('2d');
			ctx.fillStyle = 'white';
			ctx.fillRect(0, 0, base.width, base.height);
			ctx.drawImage(avatar, 10, 25, 425, 425);
			ctx.drawImage(base, 0, 0);
			ctx.font = '30px Noto';
            ctx.fillText(user.username, 25, 48);
            ctx.font = '20px Noto';
            ctx.fillText('Join date: '+ user.createdAt.toDateString(), 20, 422);
            ctx.fillText('Discriminator: '+ user.username +`#${user.discriminator}`, 20, 466);
            ctx.fillText('UserID: '+ user.id, 20, 509);
			return message.channel.send({ files: [{ attachment: canvas.toBuffer(), name: 'card.png' }] });
		} catch (err) {
			return message.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
		}
	}
};