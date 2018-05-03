const commando = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const snekfetch = require('snekfetch');
const { shorten } = require('../../assets/util/Util');

module.exports = class WikipediaCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'wikipedia',
			aliases: ['wikipedia-article','wiki'],
			group: 'search',
			memberName: 'wikipedia',
			description: 'Searches Wikipedia for your query.',
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
				.get('https://en.wikipedia.org/w/api.php')
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
			var embedcolor = '#' + ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6);
			let embed = new RichEmbed()
                .setColor(embedcolor)
				.setTitle(data.title)
				.setAuthor('Wikipedia', 'https://i.imgur.com/Z7NJBK2.png', 'https://www.wikipedia.org/')
				.setThumbnail('https://i.imgur.com/Z7NJBK2.png')
				.setURL(`https://en.wikipedia.org/wiki/${encodeURIComponent(query).replace(/\)/g, '%29')}`)
				.setDescription(shorten(data.extract.replace(/\n/g, '\n\n')));
                return message.channel.send(embed);
		} catch (err) {
			return message.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
		}
	}
};