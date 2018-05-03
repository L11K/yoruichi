const { RichEmbed } = require('discord.js');
const commando = require('discord.js-commando');
const scalc = require('scalc');
module.exports = class mathCommand extends commando.Command {
	constructor (client) {
		super(client, {
			'name': 'math',
			'aliases': ['calc'],
			'group': 'general',
			'memberName': 'math',
			'description': 'Calculate anything',
			'examples': ['math {equation to solve}', 'math -10 - abs(-3) + 2^5'],
			'guildOnly': false,

			'args': [
				{
					'key': 'equation',
					'prompt': 'What is the equation to solve?',
					'type': 'string',
					'label': 'Equation to calculate'
				}
			]
		});
	}

	

	run (message, args) {
        var embedcolor = '#' + ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6);
		const mathEmbed = new RichEmbed();

		mathEmbed
			.setColor(embedcolor)
			.addField('Equation', args.equation.toString(), false)
			.addField('Result', scalc(args.equation), false);

		return message.channel.send(mathEmbed);
	}
};