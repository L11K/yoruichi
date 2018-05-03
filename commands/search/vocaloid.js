const commando = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const snekfetch = require('snekfetch');
const { shorten } = require('../../assets/util/Util');

module.exports = class VocaloidCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'vocaloid',
			aliases: ['vocadb', 'vocaloid-song', 'vocaloid-music'],
			group: 'search',
			memberName: 'vocaloid',
			description: 'Searches VocaDB for your query.',
			clientPermissions: ['EMBED_LINKS'],
			args: [
				{
					key: 'query',
					prompt: 'What song would you like to search for?',
					type: 'string'
				}
			]
		});
	}

	async run(message, { query }) {
		try {
			const { body } = await snekfetch
				.get('http://vocadb.net/api/songs')
				.query({
					query,
					maxResults: 1,
					sort: 'FavoritedTimes',
					preferAccurateMatches: true,
					nameMatchMode: 'Words',
					fields: 'ThumbUrl,Lyrics'
				});
			if (!body.items.length) return message.channel.send('Could not find any results.');
			const data = body.items[0];
			const embed = new RichEmbed()
				.setColor(0x86D2D0)
				.setAuthor('VocaDB', 'https://i.imgur.com/6QwraDT.jpg', 'http://vocadb.net/')
				.setTitle(data.name)
				.setURL(`http://vocadb.net/S/${data.id}`)
				.setDescription(data.lyrics.length ? shorten(data.lyrics[0].value) : 'No lyrics available.')
				.setThumbnail(data.thumbUrl)
				.addField('❯ Artist', data.artistString)
				.addField('❯ Publish Date', new Date(data.publishDate).toDateString(), true);
			return message.channel.send(embed);
		} catch (err) {
			return message.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
		}
	}
};