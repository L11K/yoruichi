const commando = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
module.exports = class ChooseCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'choose',
			aliases: ['pick'],
			group: 'random',
			memberName: 'choose',
			description: 'Chooses between options you provide.',
			args: [
				{
					key: 'choices',
					prompt: 'What choices do you want me pick from?',
					type: 'string',
					infinite: true,
					max: 1950
				}
			]
		});
	}

	run(message, { choices }) {
        var embedcolor = '#' + ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6);
        let embed = new RichEmbed()
			.setDescription(`I choose **${choices[Math.floor(Math.random() * choices.length)]}!**`)
			.setColor(embedcolor);
            return message.channel.send({embed: embed});
	}
};