const commando = require('discord.js-commando');
const { createCanvas, loadImage, registerFont } = require('canvas');
const snekfetch = require('snekfetch');
const path = require('path');
const { shortenText } = require('../../assets/util/Canvas');
registerFont(path.join(__dirname, '..', '..', 'assets', 'fonts', 'Noto-Regular.ttf'), { family: 'Noto' });
registerFont(path.join(__dirname, '..', '..', 'assets', 'fonts', 'Noto-CJK.otf'), { family: 'Noto' });
registerFont(path.join(__dirname, '..', '..', 'assets', 'fonts', 'Noto-Emoji.ttf'), { family: 'Noto' });

module.exports = class SteamNowPlayingCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'now-playing',
			aliases: ['playing'],
			group: 'avatar-edit',
			memberName: 'now-playing',
			description: 'Draws a user\'s avatar and the game of your choice over a Steam "now playing" notification.',
			throttling: {
				usages: 1,
				duration: 10
			},
			clientPermissions: ['ATTACH_FILES'],
			args: [
				{
					key: 'game',
					prompt: 'Which game would you like the user to be playing?',
					type: 'string'
				},
				{
					key: 'user',
					prompt: 'Which user would you like to be playing the game?',
					type: 'user',
					default: message => message.author
				}
			]
		});
	}

	async run(message, { game, user }) {
		const avatarURL = user.displayAvatarURL;
		try {
			const base = await loadImage(path.join(__dirname, '..', '..', 'assets', 'images', 'steam-now-playing.png'));
			const { body } = await snekfetch.get(avatarURL);
			const avatar = await loadImage(body);
			const canvas = createCanvas(base.width, base.height);
			const ctx = canvas.getContext('2d');
			ctx.drawImage(base, 0, 0);
			ctx.drawImage(avatar, 21, 21, 32, 32);
			ctx.fillStyle = '#90ba3c';
			ctx.font = '10px Noto';
			ctx.fillText(user.username, 63, 26);
			ctx.fillText(shortenText(ctx, game, 160), 63, 54);
			return message.channel.send({ files: [{ attachment: canvas.toBuffer(), name: 'steam-now-playing.png' }] });
		} catch (err) {
			return message.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
		}
	}
};