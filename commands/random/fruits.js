const commando = require('discord.js-commando');
const fruits = require('../../assets/json/fruit');

module.exports = class FruitCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'fruit',
			group: 'random',
			memberName: 'fruit',
			description: 'Responds with a random fruit.'
		});
	}

	run(message) {
		return message.channel.send(fruits[Math.floor(Math.random() * fruits.length)]);
	}
};