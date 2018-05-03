const commando = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const xdicey = require('xdicey');

module.exports = class diceCommand extends commando.Command {
	constructor (client) {
		super(client, {
			'name': 'dice',
			'memberName': 'dice',
			'group': 'general',
			'aliases': ['xdicey', 'roll', 'dicey', 'die'],
			'description': 'Rolls a dice',
			'format': 'SidesOfTheDice AmountOfRolls',
			'examples': ['dice 6 5'],
			'guildOnly': false,
			'args': [
				{
					'key': 'sides',
					'prompt': 'How many sides does your die have?',
					'type': 'integer'
				}, {
					'key': 'rolls',
					'prompt': 'How many times should the die be rolled?',
					'type': 'integer'
				}
			]
		});
	}

	run (message, args) {
		const diceEmbed = new RichEmbed(),
			res = [],
			throwDice = xdicey(args.rolls, args.sides);

		for (const index in throwDice.individual) { 
			res.push(`🎲: ${throwDice.individual[index]}`);
		}

		diceEmbed
			.setColor(message.member !== null ? message.member.displayHexColor : '#FF0000')
			.addField('Dice result', res, false)
			.addField('Total', throwDice.total, false);

		return message.channel.send(diceEmbed);
	}
};