const commando = require('discord.js-commando');

module.exports = class ChristmasCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'christmas',
			group: 'events',
			memberName: 'christmas',
			description: 'Responds with whether or not it\'s Christmas.'
		});
	}

	run(message) {
		const today = new Date();
		if (today.getMonth() === 11 && today.getDate() === 25) {
			return message.channel.send('YES!!!', { files: ['https://d2gg9evh47fn9z.cloudfront.net/800px_COLOURBOX2578038.jpg'] });
		}
		return message.reply('No, today is not Christmas...');
	}
};