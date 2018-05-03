
const { RichEmbed } = require('discord.js');
const commando = require('discord.js-commando');
const coin = require('flipacoin');



module.exports = class coinCommand extends commando.Command {
	constructor (client) {
		super(client, {
			'name': 'coin',
			'memberName': 'coin',
			'group': 'general',
			'aliases': ['flip', 'coinflip'],
			'description': 'Flips a coin',
			'examples': ['coin'],
			'guildOnly': false
		});
	}

	run (message) {
		const coinEmbed = new RichEmbed(),
			res = coin();

		coinEmbed
			.setColor(message.member !== null ? message.member.displayHexColor : '#FF0000')
			.setTitle(`Flipped ${res}s`);

		return message.channel.send(coinEmbed);
	}
};