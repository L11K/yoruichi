const commando = require('discord.js-commando');
const snekfetch = require('snekfetch');
const { RichEmbed } = require('discord.js');
module.exports = class ChuckNorrisCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'chuck-jokes',
			aliases: ['chuck', 'norris'],
			group: 'random',
			memberName: 'chuck-jokes',
			description: 'Responds with a random Chuck Norris joke.',
			args: [
				{
					key: 'name',
					prompt: 'What would you like the name to be?',
					type: 'string',
					default: 'Chuck'
				}
			]
		});
	}

	async run(message, { name }) {
		try {
			const { body } = await snekfetch
				.get('http://api.icndb.com/jokes/random')
				.query({
					escape: 'javascript',
					firstName: name
                });
            var embedcolor = '#' + ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6);
            let embed = new RichEmbed()
            .setAuthor('Chuck Norris Jokes', 'https://lh3.googleusercontent.com/uZZCuKGEpq4zfzyVixAiloPQdir_OJgAxOaPY26MGC6iTN-BIrT2QbgWqAi8sqhxF8I')
            .setThumbnail('https://lh3.googleusercontent.com/uZZCuKGEpq4zfzyVixAiloPQdir_OJgAxOaPY26MGC6iTN-BIrT2QbgWqAi8sqhxF8I')
			.setDescription(body.value.joke)
			.setColor(embedcolor);
            return message.channel.send({embed: embed});
		} catch (err) {
			return message.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
		}
	}
};