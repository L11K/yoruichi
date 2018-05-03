const commando = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
module.exports = class kissCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'kiss',
			group: 'roleplay',
			memberName: 'kiss',
			description: 'kiss a user.',
            examples : ['kiss {user}', 'kiss Lisanna']
		});
	}


run(message, args) {
    var imageArray = require('../../assets/actions/kiss');
    var kiss = [Math.floor(Math.random() * imageArray.length)]
        if (message.mentions.users.first()) {
            var embedcolor = '#' + ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6);
        const embed = new RichEmbed()
        .setDescription(''+ message.mentions.users.first() + ' you have been kissed by '+ message.author.toString())
        .setColor(embedcolor)
        .setImage(`${imageArray[kiss]}`)
        message.channel.send({embed: embed});
    } else {
        if (!message.mentions.users.first()) {
            const embed = new RichEmbed()
            .setDescription("Yoruichi kissed you **giggles** :heart: ")
            .setColor(embedcolor)
            .setImage(`${imageArray[kiss]}`)
            message.channel.send({embed: embed});
        }
    }
}
};