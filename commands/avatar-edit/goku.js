const commando = require('discord.js-commando');
const { createCanvas, loadImage } = require('canvas');
const snekfetch = require('snekfetch');
const path = require('path');

module.exports = class GokuCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'goku',
			group: 'avatar-edit',
			memberName: 'goku',
			description: 'Draws three user\'s avatars over the "Distracted firstuser" meme.',
			throttling: {
				usages: 1,
				duration: 10
			},
			clientPermissions: ['ATTACH_FILES'],
			args: [
				{
					key: 'firstuser',
					label: 'other girl',
					prompt: 'Which user should be the first-user?',
					type: 'user'
				},
				{
					key: 'seconduser',
					prompt: 'Which user should be the second user?',
					type: 'user'
				}
			]
		});
	}

	async run(message, { seconduser, firstuser }) {
		const firstuserAvatarURL = firstuser.displayAvatarURL;
		const seconduserAvatarURL = seconduser.displayAvatarURL;
		try {
			const base = await loadImage(path.join(__dirname, '..', '..', 'assets', 'images', 'goku.png'));
			const firstuserAvatarData = await snekfetch.get(firstuserAvatarURL);
			const firstuserAvatar = await loadImage(firstuserAvatarData.body);
			const seconduserAvatarData = await snekfetch.get(seconduserAvatarURL);
			const seconduserAvatar = await loadImage(seconduserAvatarData.body);
			const canvas = createCanvas(base.width, base.height);
			const ctx = canvas.getContext('2d');
			ctx.drawImage(base, 0, 0);
			ctx.drawImage(firstuserAvatar, 250, 0, 250, 220);
			ctx.drawImage(seconduserAvatar, 250, 220, 250, 230);
			return message.channel.send({ files: [{ attachment: canvas.toBuffer(), name: 'goku.png' }] });
		} catch (err) {
			return message.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
		}
	}
};