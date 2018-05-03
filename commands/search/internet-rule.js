const commando = require('discord.js-commando');
const rules = require('../../assets/json/rule-of-the-internet');
const { RichEmbed } = require('discord.js');
module.exports = class RuleOfTheInternetCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'rule-of-the-internet',
			aliases: ['rules-of-the-internet', 'internet-rule', 'rule'],
			group: 'search',
			memberName: 'rule-of-the-internet',
			description: 'Responds with a rule of the internet.',
			args: [
				{
					key: 'rule',
					prompt: 'Which rule would you like to view?',
					type: 'integer',
					default: '',
					min: 1,
					max: rules.length
				}
			]
		});
	}

	run(message) {
        var embedcolor = '#' + ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6);
        let embed = new RichEmbed()
        .setAuthor('Rules of the internet.', this.client.user.displayAvatarURL)
        .setThumbnail(this.client.user.displayAvatarURL)
		.setDescription(rules[Math.floor(Math.random() * rules.length)])
		.setColor(embedcolor);
        return message.channel.send({embed: embed});
	}
};