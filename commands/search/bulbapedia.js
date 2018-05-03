const commando = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const snekfetch = require('snekfetch');
const { shorten } = require('../../assets/util/Util');

module.exports = class BulbapediaCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'bulbapedia',
			aliases: ['bulbagarden', 'bulbapedia-article', 'bulbagarden-article'],
			group: 'search',
			memberName: 'bulbapedia',
			description: 'Searches Bulbapedia for your query.',
			clientPermissions: ['EMBED_LINKS'],
			args: [
				{
					key: 'query',
					prompt: 'What article would you like to search for?',
					type: 'string'
				}
			]
		});
	}

	async run(message, { query }) {
		try {
			const { body } = await snekfetch
				.get('https://bulbapedia.bulbagarden.net/w/api.php')
				.query({
					action: 'query',
					prop: 'extracts|pageimages',
					format: 'json',
					titles: query,
					exintro: '',
					explaintext: '',
					pithumbsize: 150,
					redirects: '',
					formatversion: 2
				});
			const data = body.query.pages[0];
			if (data.missing) return message.channel.send('Could not find any results.');
			const embed = new RichEmbed()
				.setColor(0x3E7614)
				.setTitle(data.title)
				.setAuthor('Bulbapedia', 'https://i.imgur.com/ePpoeFA.png', 'https://bulbapedia.bulbagarden.net/')
				.setThumbnail(data.thumbnail ? data.thumbnail.source : null)
				.setURL(`https://bulbapedia.bulbagarden.net/wiki/${encodeURIComponent(query).replace(/\)/g, '%29')}`)
				.setDescription(shorten(data.extract.replace(/\n/g, '\n\n')));
			return message.channel.send(embed);
		} catch (err) {
			return message.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
		}
	}
};