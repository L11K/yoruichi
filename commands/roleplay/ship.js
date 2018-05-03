const commando = require('discord.js-commando');
const Random = require('random-js');
const { RichEmbed } = require('discord.js');
module.exports = class ShipCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'ship',
			group: 'roleplay',
			memberName: 'ship',
			description: 'Ships two users together.',
			args: [
				{
					key: 'first',
					label: 'first user',
					prompt: 'Who is the first user in the ship?',
					type: 'user'
				},
				{
					key: 'second',
					label: 'second user',
					prompt: 'Who is the second user in the ship?',
					type: 'user'
				}
			]
		});
	}

	run(message, { first, second }) {
		if (first.id === second.id) return message.channel.send('Shipping someone with themselves would be pretty weird.');
        const random = new Random(Random.engines.mt19937().seed(Math.abs(first.id - second.id)));
        var embedcolor = '#' + ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6);
		    let embed = new RichEmbed()
            .setColor(embedcolor)
            .setDescription(`I'd give ${first.username} and ${second.username} a relationship meter **${random.integer(0, 100)}%!**`);
		return message.channel.send({embed: embed});
	}
};