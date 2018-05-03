const commando = require('discord.js-commando');
const { createCanvas, loadImage } = require('canvas');
const snekfetch = require('snekfetch');
const { silhouette } = require('../../assets/util/Canvas');

module.exports = class WhosThatPokemonCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'which-pokemon',
			aliases: ['who-pokemon', 'whos-that-pokémon', 'who-pokémon'],
			group: 'game',
			memberName: 'which-pokemon',
			description: 'Guess who that Pokémon is.',
			throttling: {
				usages: 1,
				duration: 10
			},
			clientPermissions: ['ATTACH_FILES'],
			args: [
				{
					key: 'hide',
					prompt: 'Do you want to silhouette the Pokémon\'s image?',
					type: 'boolean',
					default: false
				}
			]
		});

		this.cache = new Map();
	}

	async run(message, { hide }) {
		const pokemon = Math.floor(Math.random() * 802) + 1;
		try {
			const data = await this.fetchPokemon(pokemon);
			const names = data.names.map(name => name.name.toLowerCase());
			const displayName = data.names.filter(name => name.language.name === 'en')[0].name;
			const id = data.id.toString().padStart(3, '0');
			const attachment = await this.fetchImage(id, hide);
			await message.channel.send('**You have 15 seconds, who\'s that Pokémon?**', { files: [{ attachment, name: `${id}.png` }] });
			const messages = await message.channel.awaitMessages(res => res.author.id === message.author.id, {
				max: 1,
				time: 15000
			});
			if (!messages.size) return message.channel.send(`Sorry, time is up! It was ${displayName}.`);
			if (!names.includes(messages.first().content.toLowerCase())) return message.channel.send(`Nope, sorry, it's ${displayName}.`);
			return message.channel.send('Nice job! 10/10! You deserve some cake!');
		} catch (err) {
			return message.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
		}
	}

	async fetchPokemon(pokemon) {
		if (this.cache.has(pokemon)) return this.cache.get(pokemon);
		const { body } = await snekfetch.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemon}/`);
		this.cache.set(body.id, body);
		return body;
	}

	async fetchImage(id, hide = false) {
		const image = await snekfetch.get(`https://www.serebii.net/sunmoon/pokemon/${id}.png`);
		if (!hide) return image.body;
		const base = await loadImage(image.body);
		const canvas = createCanvas(base.width, base.height);
		const ctx = canvas.getContext('2d');
		ctx.drawImage(base, 0, 0);
		silhouette(ctx, 0, 0, base.width, base.height);
		return canvas.toBuffer();
	}
};
