const commando = require('discord.js-commando');
const { stripIndents } = require('common-tags');
const opinions = ['Yesh! 👍', 'No! 👎', 'Hell no! 😱', 'Yep! ❤' ];
const { RichEmbed } = require('discord.js');
module.exports = class OpinionCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'opinion',
			group: 'random',
			memberName: 'opinion',
			description: 'Determines the opinion on something.',
			args: [
				{
					key: 'question',
					prompt: 'What do you want to get an opinion on?',
					type: 'string',
					max: 1950
				}
			]
		});
	}

	run(message, { question }) {
var embedcolor = '#' + ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6);
        let embed = new RichEmbed()
            .setAuthor('I\'ll determine your opinion', this.client.user.displayAvatarURL)
			.setDescription(`${question} \n${opinions[Math.floor(Math.random() * opinions.length)]}`)
			.setColor(embedcolor)
			.setThumbnail(this.client.user.displayAvatarURL)
			return message.channel.send({embed: embed});
		
	}
};