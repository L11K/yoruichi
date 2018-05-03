const commando = require('discord.js-commando');
const snekfetch = require('snekfetch');
const { RichEmbed } = require('discord.js');
module.exports = class DogCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'dog',
			aliases: ['puppy'],
			group: 'search',
			memberName: 'dog',
			description: 'Responds with a random dog image.',
			clientPermissions: ['ATTACH_FILES']
		});
	}

	async run(message) {
		try {
            const { body } = await snekfetch.get('https://dog.ceo/api/breeds/image/random');
            var embedcolor = '#' + ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6);
            let embed = new RichEmbed()
            .setImage(body.message)
			.setColor(embedcolor);
            return message.channel.send({embed: embed});
			
		} catch (err) {
			return message.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
		}
	}
};