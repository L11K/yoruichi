const commando = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
module.exports = class RateWaifuCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'rate-waifu',
			aliases: ['waifu', 'rate'],
			group: 'roleplay',
			memberName: 'rate-waifu',
			description: 'Rates a waifu.',
			args: [
				{
					key: 'waifu',
					prompt: 'Who do you want to rate?',
					type: 'string',
					max: 1950
				}
			]
		});
	}

	run(message, { waifu }) {
        var embedcolor = '#' + ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6);
        let embed = new RichEmbed()
			.setDescription(`I'd give **${waifu}** a **${Math.floor(Math.random() * 10) + 1}/10!**`)
			.setColor(embedcolor);
            return message.channel.send({embed: embed});
    }
};