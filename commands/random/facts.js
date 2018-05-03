const commando = require('discord.js-commando');
const snekfetch = require('snekfetch');
const { RichEmbed } = require('discord.js');
module.exports = class FactCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'facts',
			aliases: ['wikifakt'],
			group: 'random',
			memberName: 'facts',
			description: 'Responds with a random fact.'
		});
	}

	async run(message) {
		try {
			const article = await this.randomWikipediaArticle();
			const { body } = await snekfetch
				.get('https://en.wikipedia.org/w/api.php')
				.query({
					action: 'query',
					prop: 'extracts',
					format: 'json',
					titles: article,
					exintro: '',
					explaintext: '',
					redirects: '',
					formatversion: 2
				});
			let fact = body.query.pages[0].extract;
			if (fact.length > 200) {
				const facts = fact.split('.');
				fact = `${facts[0]}.`;
				if (fact.length < 200 && facts.length > 1) fact += `${facts[1]}.`;
            }
            var embedcolor = '#' + ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6);
            let embed = new RichEmbed()
            .setAuthor('Random Facts', this.client.user.displayAvatarURL)
            .setThumbnail(this.client.user.displayAvatarURL)
			.setDescription(fact)
			.setColor(embedcolor);
            return message.channel.send({embed: embed});
			
		} catch (err) {
			return message.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
		}
	}

	async randomWikipediaArticle() {
		const { body } = await snekfetch
			.get('https://en.wikipedia.org/w/api.php')
			.query({
				action: 'query',
				list: 'random',
				rnnamespace: 0,
				rnlimit: 1,
				format: 'json',
				formatversion: 2
			});
		return body.query.random[0].title;
	}
};