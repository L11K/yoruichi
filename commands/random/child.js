const { Command } = require('discord.js-commando');
const genders = ['boy', 'girl'];
const { RichEmbed } = require('discord.js');
module.exports = class OffspringCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'child',
			aliases: ['childs-gender'],
			group: 'random',
			memberName: 'child',
			description: 'Determines if your new child will be a boy or a girl.'
		});
	}

	run(message) {
        var embedcolor = '#' + ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6);
        let embed = new RichEmbed()
			.setDescription(`Your baby's gender is a ${genders[Math.floor(Math.random() * genders.length)]}!`)
            .setColor(embedcolor);
            return message.channel.send({embed: embed});
	}
};