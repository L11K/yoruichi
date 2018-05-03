const commando = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const maljs = require('maljs');
const vibrant = require('node-vibrant');
module.exports = class animeCommand extends commando.Command {
	constructor (client) {
		super(client, {
			'name': 'anime',
			'group': 'search',
			'aliases': ['ani', 'mal'],
			'memberName': 'anime',
			'description': 'Finds anime on MyAnimeList',
			'examples': ['anime {anime_name}', 'anime Pokemon'],
			'guildOnly': false,

			'args': [
				{
					'key': 'query',
					'prompt': 'What anime do you want to find?',
					'type': 'string',
					'label': 'anime_name'
				}
			]
		});
		this.embedColor = '#FF0000';
	}

	deleteCommandMessages (message) {
		if (message.deletable && this.client.provider.get('global', 'deletecommandmessages', false)) {
			message.delete();
		}
	}

	async fetchColor (img) {

		const palette = await vibrant.from(img).getPalette();

		if (palette) {
			const pops = [],
				swatches = Object.values(palette);

			let prominentSwatch = {};

			for (const swatch in swatches) {
				if (swatches[swatch]) {
					pops.push(swatches[swatch]._population);
				}
			}

			const highestPop = pops.reduce((a, b) => Math.max(a, b));

			for (const swatch in swatches) {
				if (swatches[swatch]) {
					if (swatches[swatch]._population === highestPop) {
						prominentSwatch = swatches[swatch];
						break;
					}
				}
			}
			this.embedColor = prominentSwatch.getHex();
		}

		return this.embedColor;
	}

	async run (message, args) {
		const aniEmbed = new RichEmbed(),
			res = await maljs.quickSearch(args.query, 'anime');

		if (res) {
			const anime = await res.anime[0].fetch();

			if (anime) {

				aniEmbed
					.setColor(await this.fetchColor(anime.cover))
					.setThumbnail(anime.cover)
					.setTitle(anime.title)
					.setImage(anime.cover)
					.setDescription(anime.description)
					.setURL(`${anime.mal.url}${anime.path}`)
					.addField('Score', anime.score, true)
					.addField('Popularity', anime.popularity, true)
					.addField('Rank', anime.ranked, true);

				message.channel.send(aniEmbed);
			}
		}
	}
};