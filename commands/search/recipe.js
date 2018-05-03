const commando = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const snekfetch = require('snekfetch');

module.exports = class RecipeCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'recipe',
			aliases: ['recipe-puppy'],
			group: 'search',
			memberName: 'recipe',
			description: 'Searches for recipes based on your query.',
			clientPermissions: ['EMBED_LINKS'],
			args: [
				{
					key: 'query',
					prompt: 'What recipe would you like to search for?',
					type: 'string'
				}
			]
		});
	}

	async run(message, { query }) {
		try {
			const { raw } = await snekfetch
				.get('http://www.recipepuppy.com/api/')
				.query({ q: query });
			const body = JSON.parse(raw.toString());
			if (!body.results.length) return message.channel.send('Could not find any results.');
			const recipe = body.results[Math.floor(Math.random() * body.results.length)];
			const embed = new RichEmbed()
				.setAuthor('Recipe Puppy', 'https://i.imgur.com/lT94snh.png', 'http://www.recipepuppy.com/')
				.setColor(0xC20000)
				.setURL(recipe.href)
				.setTitle(recipe.title)
                .setDescription(`**Ingredients**: ${recipe.ingredients}`)
                .setThumbnail(recipe.thumbnail);
			return message.channel.send(embed);
		} catch (err) {
			if (err.statusCode === 500) return message.say('Could not find any results.');
			return message.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
		}
	}
};