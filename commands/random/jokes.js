const commando = require('discord.js-commando');
const jokes = require('../../assets/json/jokes');
const { RichEmbed } = require('discord.js');
module.exports = class JokeCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'jokes',
			group: 'random',
			memberName: 'jokes',
			description: 'Responds with a random joke.'
		});
	}

	run(message) {
        var embedcolor = '#' + ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6);
        let embed = new RichEmbed()
        .setAuthor('Jokes', this.client.user.displayAvatarURL)
        .setThumbnail(this.client.user.displayAvatarURL)
		.setDescription(jokes[Math.floor(Math.random() * jokes.length)])
		.setColor(embedcolor);
        return message.channel.send({embed: embed});
		
	}
};