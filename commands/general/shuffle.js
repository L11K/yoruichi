const commando = require('discord.js-commando');
const { shuffle } = require('../../assets/util/Util');

module.exports = class ShuffleCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'shuffle',
			group: 'general',
			memberName: 'shuffle',
			description: 'Shuffles text.',
			args: [
				{
					key: 'text',
					prompt: 'What text would you like to shuffle?',
					type: 'string'
				}
			]
		});
	}

	run(message, { text }) {
		return message.channel.send(shuffle(text.split('')).join(''));
	}
};