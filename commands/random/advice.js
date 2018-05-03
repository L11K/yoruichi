const commando = require('discord.js-commando');
const { RichEmbed } = require('discord.js');

module.exports = class CatFactCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'advices',
			aliases: ['advice'],
			group: 'random',
			memberName: 'advices',
			description: 'Responds with a random advices.'
		});
	}

	run(message) {
        require('request')('http://api.adviceslip.com/advice', function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var embedcolor = '#' + ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6);
            const embed = new RichEmbed()
            .setColor(embedcolor)
            .setAuthor('Random Advices', "https://cdn.discordapp.com/avatars/439327447859855360/bb0aad7e628414b5ffae6fa97f0b291a.png?size=2048")
            .setThumbnail("https://cdn.discordapp.com/avatars/439327447859855360/bb0aad7e628414b5ffae6fa97f0b291a.png?size=2048")
			.setDescription(`${JSON.parse(body).slip.advice}`)
            message.channel.send({embed: embed});
        } else {
          message.channel.send(`**Advice:**\n\n I couldn't think of any advice...`).then(m => m.delete(25000))
        }
      });
    }
}