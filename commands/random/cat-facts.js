const commando = require('discord.js-commando');
const facts = require('../../assets/json/cat-fact');
const { RichEmbed } = require('discord.js');
module.exports = class CatFactCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'cat-facts',
			aliases: ['neko-fact', 'kitty-fact'],
			group: 'random',
			memberName: 'cat-fact',
			description: 'Responds with a random cat fact.'
		});
	}

	run(message) {
		var embedcolor = '#' + ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6);
        let embed = new RichEmbed()
            .setAuthor('Cat Facts', this.client.user.displayAvatarURL)
            .setThumbnail(this.client.user.displayAvatarURL)
			.setDescription(facts[Math.floor(Math.random() * facts.length)])
			.setColor(embedcolor);
            return message.channel.send({embed: embed});
	}
};