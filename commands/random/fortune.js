const commando = require('discord.js-commando');
const { stripIndents } = require('common-tags');
const fortunes = require('../../assets/json/fortune');
const { RichEmbed } = require('discord.js');
module.exports = class FortuneCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'fortune',
			aliases: ['fortune-cookie'],
			group: 'random',
			memberName: 'fortune',
			description: 'Responds with a random fortune.'
		});
	}

	run(message) {
        var embedcolor = '#' + ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6);
        let embed = new RichEmbed()
        .setAuthor('Random Fortune', this.client.user.displayAvatarURL)
        .setThumbnail(this.client.user.displayAvatarURL)
		.setDescription(stripIndents`\`\`\`${fortunes[Math.floor(Math.random() * fortunes.length)]}\`\`\``)
		.setColor(embedcolor);
        return message.channel.send({embed: embed});
	}
};