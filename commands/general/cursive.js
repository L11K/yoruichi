const commando = require('discord.js-commando');
const { letterTrans } = require('custom-translate');
const dictionary = require('../../assets/json/cursive');

module.exports = class CursiveCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'cursive',
			group: 'general',
			memberName: 'cursive',
			description: 'Converts text to cursive.',
			args: [
				{
					key: 'text',
					prompt: 'What text would you like to convert to cursive?',
					type: 'string',
					validate: text => {
						if (letterTrans(text, dictionary).length < 2000) return true;
						return 'Invalid text, your text is too long.';
					}
				}
			]
		});
	}

	run(message, { text }) {
		return message.channel.send(letterTrans(text, dictionary));
	}
};