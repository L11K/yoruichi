const commando = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const urban = require('urban');
module.exports = class urbanCommand extends commando.Command {
	constructor (client) {
		super(client, {
			'name': 'urban',
			'group': 'search',
			'aliases': ['ub', 'ud'],
			'memberName': 'urban',
			'description': 'Find definitions on urban dictionary',
			'examples': ['urban {word}', 'urban ugt'],
			'guildOnly': false,

			'args': [
				{
					'key': 'query',
					'prompt': 'What word do you want to define?',
					'type': 'string',
					'label': 'Word to define'
				}
			]
		});
	}

	deleteCommandMessages (message) {
		if (message.deletable && this.client.provider.get('global', 'deletecommandmessages', false)) {
			message.delete();
		}
	}

	run (message, args) {
		urban(args.query).first((json) => {
			if (!json) {
				return message.reply('⚠️ ***nothing found***');
            }
            var embedcolor = '#' + ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6);
			const urbanEmbed = new RichEmbed(); 

            urbanEmbed
                .setColor(embedcolor)
                .setAuthor(`Urban Search - ${json.word}`)
                .setThumbnail("http://www.dimensionalbranding.com/userfiles/urban_dictionary.jpg")
				.addField('Definition', json.definition.length <= 1024 ? json.definition : `Truncated due to exceeding maximum length\n${json.definition.slice(0, 970)}`, false)
                .addField('Example', json.example.length <= 1024 ? json.example : `Truncated due to exceeding maximum length\n${json.example.slice(0, 970)}`, false)
                .addField('Permalink', json.permalink, false);

			this.deleteCommandMessages(message);

			return message.channel.send(urbanEmbed);
		});
	}
};