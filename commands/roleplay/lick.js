const commando = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
module.exports = class lickCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'lick',
			group: 'roleplay',
			memberName: 'lick',
			description: 'licks a user.',
            examples : ['lick {user}', 'lick Lisanna']
		});
	}


run(message, args) {
    var imageArray = require('../../assets/actions/lick');
    var lick = [Math.floor(Math.random() * imageArray.length)]
        if (message.mentions.users.first()) {
            var embedcolor = '#' + ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6);
        const embed = new RichEmbed()
        .setDescription(''+ message.mentions.users.first() + ' you have been licked by '+ message.author.toString())
        .setColor(embedcolor)
        .setImage(`${imageArray[lick]}`)
        message.channel.send({embed: embed});
    } else {
        if (!message.mentions.users.first()) {
            const embed = new RichEmbed()
            .setDescription("Yoruichi licked you **giggles** :heart: ")
            .setColor(embedcolor)
            .setImage(`${imageArray[lick]}`)
            message.channel.send({embed: embed});
        }
    }
}
};