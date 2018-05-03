const { RichEmbed } = require('discord.js');
const commando = require('discord.js-commando');
const facts = require('../../assets/json/dog-fact');

module.exports = class DogFactCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'dog-facts',
			aliases: ['puppy-fact'],
			group: 'random',
			memberName: 'dog-fact',
			description: 'Responds with a random dog fact.'
		});
	}

	run(message) {
        var embedcolor = '#' + ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6);
        let embed = new RichEmbed()
            .setAuthor('Dog Facts', this.client.user.displayAvatarURL)
            .setThumbnail(this.client.user.displayAvatarURL)
			.setDescription(facts[Math.floor(Math.random() * facts.length)])
			.setColor(embedcolor);
            return message.channel.send({embed: embed});
	}
};