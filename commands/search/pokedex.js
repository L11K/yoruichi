const commando = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const snekfetch = require('snekfetch');
const { stripIndents } = require('common-tags');

module.exports = class PokedexCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'pokedex',
			aliases: ['pokemon', 'pokémon', 'pokédex'],
			group: 'search',
			memberName: 'pokedex',
			description: 'Searches the Pokédex for a Pokémon.',
			clientPermissions: ['EMBED_LINKS'],
			args: [
				{
					key: 'pokemon',
					prompt: 'What Pokémon would you like to get information on?',
					type: 'string',
					parse: pokemon => encodeURIComponent(pokemon.toLowerCase().replace(/ /g, '-'))
				}
			]
		});
	}

	async run(message, { pokemon }) {
		try {
			const { body } = await snekfetch.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemon}/`);
			const id = body.id.toString().padStart(3, '0');
			var embedcolor = '#' + ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6);
			let embed = new RichEmbed()
                .setColor(embedcolor)
				.setAuthor(
					`#${id} - ${this.filterPokemonData(body.names, false).name}`,
					`https://www.serebii.net/pokedex-sm/icon/${id}.png`,
					`https://www.serebii.net/pokedex-sm/${id}.shtml`
				)
				.setDescription(stripIndents`\`\`\`md
					The ${this.filterPokemonData(body.genera, false).genus}
					${this.filterPokemonData(body.flavor_text_entries).flavor_text.replace(/\n|\f|\r/g, ' ')}
                    \`\`\``)
				.setThumbnail(`https://www.serebii.net/sunmoon/pokemon/${id}.png`);
			return message.channel.send(embed);
		} catch (err) {
			if (err.statusCode === 404) return message.channel.send('Could not find any results.');
			return message.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
		}
	}

	filterPokemonData(arr, random = true) {
		const filtered = arr.filter(entry => entry.language.name === 'en');
		return filtered[random ? Math.floor(Math.random() * filtered.length) : 0];
	}
};