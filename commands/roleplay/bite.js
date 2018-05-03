const commando = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
module.exports = class biteCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'bite',
			group: 'roleplay',
			memberName: 'bite',
			description: 'bite a user.',
            examples : ['bite {user}', 'bite Lisanna']
		});
	}


run(message, args) {
    var imageArray = require('../../assets/actions/bite');
    var bite = [Math.floor(Math.random() * imageArray.length)]
        if (message.mentions.users.first()) {
            var embedcolor = '#' + ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6);
        const embed = new RichEmbed()
        .setDescription(''+ message.mentions.users.first() + ' you have been bitten by '+ message.author.toString())
        .setColor(embedcolor)
        .setImage(`${imageArray[bite]}`)
        message.channel.send({embed: embed});
    } else {
        if (!message.mentions.users.first()) {
            const embed = new RichEmbed()
            .setDescription("Yoruichi bites with you **giggles** :heart: ")
            .setColor(embedcolor)
            .setImage(`${imageArray[bite]}`)
            message.channel.send({embed: embed});
        }
    }
}
};