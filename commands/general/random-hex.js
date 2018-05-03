const { RichEmbed } = require('discord.js');
const commando = require('discord.js-commando');

module.exports = class RandomHexCommand extends commando.Command {
	constructor (client) {
		super(client, {
			'name': 'randomhex',
			'memberName': 'randomhex',
			'group': 'general',
			'aliases': ['randhex', 'rhex', 'randomcolor', 'randcol'],
			'description': 'Generate a random hexadecimal color',
			'examples': ['randomhex'],
			'guildOnly': false
		});
	}

	run (message) {
		const embed = new RichEmbed(),
			hex = `#${Math.floor(Math.random() * 16777215).toString(16)}`;

		embed
			.setColor(hex)
			.setDescription(hex);

		message.channel.send(embed);
	}
};