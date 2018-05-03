const commando = require('discord.js-commando');
const snekfetch = require('snekfetch');

module.exports = class RoboCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'robo',
			group: 'image-edit',
			memberName: 'robo',
			description: 'Creates a robot based on the text you provide.',
			clientPermissions: ['ATTACH_FILES'],
			args: [
				{
					key: 'text',
					prompt: 'What text should be used for generation?',
					type: 'string',
					parse: text => encodeURIComponent(text)
				}
			]
		});
	}

	async run(message, { text }) {
		try {
			const { body } = await snekfetch.get(`https://robohash.org/${text}`);
			return message.channel.send({ files: [{ attachment: body, name: 'robohash.png' }] });
		} catch (err) {
			return message.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
		}
	}
};