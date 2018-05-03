const commando = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
module.exports = class hugCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'hug',
			group: 'roleplay',
			memberName: 'hug',
			description: 'hugs a user.',
            examples : ['hug {user}', 'hug Lisanna']
		});
	}


run(message, args) {
    var imageArray = require('../../assets/actions/hug');
    var hug = [Math.floor(Math.random() * imageArray.length)]
        if (message.mentions.users.first()) {
            var embedcolor = '#' + ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6);
        const embed = new RichEmbed()
        .setDescription(''+ message.mentions.users.first() + ' you have been hugged by '+ message.author.toString())
        .setColor(embedcolor)
        .setImage(`${imageArray[hug]}`)
        message.channel.send({embed: embed});
    } else {
        if (!message.mentions.users.first()) {
            const embed = new RichEmbed()
            .setDescription("Yoruichi hugs you **giggles** :heart: ")
            .setColor(embedcolor)
            .setImage(`${imageArray[hug]}`)
            message.channel.send({embed: embed});
        }
    }
}
};