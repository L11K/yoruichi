const commando = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
module.exports = class cuddleCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'cuddle',
			group: 'roleplay',
			memberName: 'cuddle',
			description: 'cuddle with a user.',
            examples : ['cuddle {user}', 'cuddle Lisanna']
		});
	}


run(message, args) {
    var imageArray = require('../../assets/actions/cuddle');
    var cuddle = [Math.floor(Math.random() * imageArray.length)]
        if (message.mentions.users.first()) {
            var embedcolor = '#' + ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6);
        const embed = new RichEmbed()
        .setDescription(''+ message.mentions.users.first() + ' you have been cuddled by '+ message.author.toString())
        .setColor(embedcolor)
        .setImage(`${imageArray[cuddle]}`)
        message.channel.send({embed: embed});
    } else {
        if (!message.mentions.users.first()) {
            const embed = new RichEmbed()
            .setDescription("Yoruichi cuddles with you **giggles** :heart: ")
            .setColor(embedcolor)
            .setImage(`${imageArray[cuddle]}`)
            message.channel.send({embed: embed});
        }
    }
}
};