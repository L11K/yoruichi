const { RichEmbed } = require('discord.js');
const commando = require('discord.js-commando');

module.exports = class embedCommand extends commando.Command {
	constructor (client) {
		super(client, {
			'name': 'customembed',
			'group': 'general',
			'aliases': ['c-emb', 'cust-emb'],
			'memberName': 'embed',
			'description': 'Create custom MessageEmbeds on the fly',
			'examples': ['embed {FieldName>Value1;Value2<FieldName2>Value1;Value2... etc}', 'embed What goes up but never comes down?>Your Age'],
			'guildOnly': false,

			'args': [
				{
					'key': 'embedContent',
					'prompt': 'What should the content of the embed be?',
					'type': 'string',
					'label': 'input for the custom embed',
					'validate': (input) => {
						if (input.match(/([a-zA-Z0-9\!\@\#\$\%\^\&\*\(\)\-\_\=\+\[\{\]\}\;\:\'\"\\\|\,\<\.\>\/\?\`\~]*)>([a-zA-Z0-9\!\@\#\$\%\^\&\*\(\)\-\_\=\+\[\{\]\}\;\:\'\"\\\|\,\<\.\>\/\?\`\~]*).*/)) { // eslint-disable-line max-len
							return true;
						}

						return 'The format for a custom rich embed should at least be `FieldName>Value`';
					},
					'wait': 60
				}
			]
		});
	}

	

	run (message, args) {
        var embedcolor = '#' + ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6);
		const customEmbed = new RichEmbed(),
			paramString = args.embedContent,
			fields = paramString.split('<');

		fields.forEach((field) => {
			const chunks = field.split('>'),
				header = chunks[0],
				values = chunks[1].split(';');

			customEmbed.addField(header, values.join('\n'), true);
		});

		customEmbed.setColor(embedcolor);
        customEmbed.setThumbnail(message.author.displayAvatarURL);
		return message.channel.send(customEmbed);
	}
};