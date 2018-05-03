const commando = require('discord.js-commando');
const snekfetch = require('snekfetch');
const { stripIndents } = require('common-tags');

module.exports = class JishoCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'jisho',
			aliases: ['japanese-dictionary', 'define-japanese', 'define-jpn'],
			group: 'search',
			memberName: 'jisho',
			description: 'Defines a word, but with Japanese.',
			args: [
				{
					key: 'word',
					prompt: 'What word would you like to look up?',
					type: 'string'
				}
			]
		});
	}

	async run(message, { word }) {
		try {
			const { body } = await snekfetch
				.get('http://jisho.org/api/v1/search/words')
				.query({ keyword: word });
			if (!body.data.length) return message.channel.send('Could not find any results.');
			const data = body.data[0];
			return message.channel.send(stripIndents`\`\`\`md
				${data.japanese[0].word || data.japanese[0].reading}
				${data.senses[0].english_definitions.join(', ')}
                \`\`\``);
		} catch (err) {
			return message.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
		}
	}
};