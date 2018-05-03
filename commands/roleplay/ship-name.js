const commando = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
module.exports = class ShipNameCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'ship-name',
			group: 'roleplay',
			memberName: 'ship-name',
			description: 'Creates a ship name from two names.',
			args: [
				{
					key: 'start',
					label: 'start name',
					prompt: 'What name should be at the start of the ship name?',
					type: 'string',
					max: 500,
					parse: start => start.toLowerCase()
				},
				{
					key: 'end',
					label: 'end name',
					prompt: 'What name should be at the end of the ship name?',
					type: 'string',
					max: 500,
					parse: end => end.toLowerCase()
				}
			]
		});
	}

	run(message, { start, end }) {
        var embedcolor = '#' + ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6);
			let embed = new RichEmbed()
                .setColor(embedcolor)
                .setAuthor('Love', 'https://orig00.deviantart.net/6303/f/2015/300/6/a/_starry_hearts__render_by_lightora-d9em79y.png')
                .setThumbnail('https://orig00.deviantart.net/6303/f/2015/300/6/a/_starry_hearts__render_by_lightora-d9em79y.png')
                .setDescription(`**${start.slice(0, Math.floor(start.length / 2))}${end.slice(Math.floor(end.length / 2))}**`)
                return message.channel.send(embed);
	}
};