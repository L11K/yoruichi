const commando = require('discord.js-commando');
const snekfetch = require('snekfetch');

module.exports = class CowSayCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'cow-say',
			group: 'general',
			memberName: 'cow-say',
			description: 'Makes a cow say your text.',
			args: [
				{
					key: 'text',
					prompt: 'What text would you like the cow to say?',
					type: 'string',
					max: 1500
				}
			]
		});
	}

	async run(message, { text }) {
		try {
			const { body } = await snekfetch
				.get('http://cowsay.morecode.org/say')
				.query({
					message: text,
					format: 'json'
				});
			return message.code(null, body.cow);
		} catch (err) {
			return message.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
		}
	}
};