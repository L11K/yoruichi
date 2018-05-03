const commando = require('discord.js-commando');
const random = require('node-random');
const { RichEmbed } = require('discord.js');
module.exports = class rpsCommand extends commando.Command {
	constructor (client) {
		super(client, {
			'name': 'rps',
			'memberName': 'rps',
			'group': 'general',
			'aliases': ['rockpaperscissors'],
			'description': 'Play Rock Paper Scissors against random.org randomization',
			'format': 'Rock|Paper|Scissors',
			'examples': ['rps Rock'],
			'guildOnly': false,
			'args': [
				{
					'key': 'hand',
					'prompt': 'Do you play rock, paper or scissors?',
					'type': 'string',
					'validate': (hand) => {
						const validHands = ['rock', 'paper', 'scissors'];

						if (validHands.includes(hand.toLowerCase())) {
							return true;
						}

						return `Has to be one of ${validHands.join(', ')}`;
					},
					'parse': p => p.toLowerCase()
				}
			]
		});
	}

	run (message, args) {
		random.integers({
			'number': 1,
			'minimum': 1,
			'maximum': 3
		}, (error, randoms) => {
			if (!error) {
				const rpsEmbed = new RichEmbed();

				let resString = 'Woops something went wrong';

				if (args.hand === 'rock' && randoms === 1) {
					resString = 'It\'s a draw 😶! Both picked 🗿';
				} else if (args.hand === 'rock' && randoms === 2) {
					resString = 'I won 😃! My 📜 covered your 🗿';
				} else if (args.hand === 'rock' && randoms === 3) {
					resString = ' I lost 😞! Your 🗿 smashed my ️️️✂️ to pieces';
				} else if (args.hand === 'paper' && randoms === 1) {
					resString = 'I lost 😞! Your 📜 covered my 🗿';
				} else if (args.hand === 'paper' && randoms === 2) {
					resString = 'It\'s a draw 😶! Both picked 📜';
				} else if (args.hand === 'paper' && randoms === 3) {
					resString = 'I won 😃! My ✂️ cut your 📜 to shreds';
				} else if (args.hand === 'scissors' && randoms === 1) {
					resString = 'I won 😃! My 🗿 smashed your ✂️ to pieces';
				} else if (args.hand === 'scissors' && randoms === 2) {
					resString = 'I lost 😞! Your ✂️ cut my 📜 to shreds';
				} else if (args.hand === 'scissors' && randoms === 3) {
					resString = 'It\'s a draw 😶! Both picked ✂️';
				}

				rpsEmbed
					.setColor(message.member !== null ? message.member.displayHexColor : '#FF0000')
					.setTitle('Rock Paper Scissors')
					.setDescription(resString);

				return message.channel.send(rpsEmbed);
			}

			return message.reply('⚠️ an error occured getting a random result and I\'m not going to rig this game.');
		});
	}
};