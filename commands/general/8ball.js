const { RichEmbed } = require('discord.js');
const commando = require('discord.js-commando');
const predict = require('eightball');
    
module.exports = class eightBallCommand extends commando.Command {
	constructor (client) {
		super(client, {
			'name': '8ball',
			'group': 'general',
			'aliases': ['eightball', '8b'],
			'memberName': '8ball', 
			'description': 'Roll a magic 8ball',
			'examples': ['8ball {question}', '8ball is Favna a genius coder?'],
			'guildOnly': false,

			'args': [
				{
					'key': 'question',
					'prompt': '8ball what?',
					'type': 'string',
					'label': 'Question to ask 8ball'
				}
			]
		});
	}

	run (message, args) {
            var embedcolor = '#' + ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6);
		    let embed = new RichEmbed()
            .setColor(embedcolor)
            .addField(':question: Question', args.question, false)
            .setThumbnail(this.client.user.displayAvatarURL)
            .addField(':8ball: 8ball', predict(), false);
			return message.channel.send({embed: embed});
			
	}
};
