const commando = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const request = require("snekfetch");
module.exports = class defineCommand extends commando.Command {
	constructor (client) {
		super(client, {
			'name': 'define',
			'group': 'search',
			'aliases': ['def', 'dict'],
			'memberName': 'define',
			'description': 'Gets the definition on a word on glosbe',
			'examples': ['define {word}', 'define pixel'],
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

	async run (message, args) {
        var embedcolor = '#' + ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6);
		const defineEmbed = new RichEmbed(),
			word = await request.get(`https://glosbe.com/gapi/translate?from=en&dest=en&format=json&phrase=${args.query}`);

		if (word.body.tuc) {
			const final = [`**Definitions for __${args.query}__:**`];

			for (let [index, item] of Object.entries(word.body.tuc.filter(tuc => tuc.meanings)[0].meanings.slice(0, 5))) { // eslint-disable-line prefer-const

				item = item.text
					.replace(/\[(\w+)[^\]]*](.*?)\[\/\1]/g, '_')
					.replace(/&quot;/g, '"')
					.replace(/&#39;/g, '\'')
					.replace(/<b>/g, '[')
					.replace(/<\/b>/g, ']')
					.replace(/<i>|<\/i>/g, '_');
				final.push(`**${(parseInt(index, 10) + 1)}:** ${item}`);
			}
			defineEmbed
                .setColor(embedcolor)
                .setThumbnail("https://static.tumblr.com/54c63f058ae6367bbdb854e7018e9af3/8biwytm/YkBokdtf0/tumblr_static_ccw7zprvsl4wc4k4wsgscsw0s_2048_v2.png")
				.setDescription(final);

			this.deleteCommandMessages(message);

			return message.channel.send(defineEmbed);
		}

		return message.channel.send('⚠️ ***nothing found***');
	}
};