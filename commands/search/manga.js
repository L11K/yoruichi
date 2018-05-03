const commando = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const maljs = require('maljs');
const vibrant = require('node-vibrant');
module.exports = class mangaCommand extends commando.Command {
	constructor (client) {
		super(client, {
			'name': 'manga',
			'group': 'search',
			'aliases': ['cartoon', 'man'],
			'memberName': 'manga',
			'description': 'Finds manga on MyAnimeList',
			'examples': ['manga {manga_name}', 'manga Pokemon'],
			'guildOnly': false,

			'args': [
				{
					'key': 'query',
					'prompt': 'What manga do you want to find?',
					'type': 'string',
					'label': 'manga_name'
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
		const manEmbed = new RichEmbed(),
			res = await maljs.quickSearch(args.query, 'manga');

		if (res) {
			const manga = await res.manga[0].fetch();

			if (manga) {

				manEmbed
					.setColor(await this.fetchColor(manga.cover))
					.setTitle(manga.title)
					.setThumbnail(manga.cover)
					.setImage(manga.cover)
					.setDescription(manga.description)
					.setURL(`${manga.mal.url}${manga.path}`)
					.addField('Score', manga.score, true)
					.addField('Popularity', manga.popularity, true)
					.addField('Rank', manga.ranked, true);

				message.channel.send(manEmbed);
			}
		}
	}
};