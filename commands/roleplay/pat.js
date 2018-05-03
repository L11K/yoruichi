const commando = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
module.exports = class patCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'pat',
			group: 'roleplay',
			memberName: 'pat',
			description: 'pats a user.',
            examples : ['pat {user}', 'pat Lisanna']
		});
	}


run(message, args) {
    var imageArray = require('../../assets/actions/pat');
    var pat = [Math.floor(Math.random() * imageArray.length)]
        if (message.mentions.users.first()) {
            var embedcolor = '#' + ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6);
        const embed = new RichEmbed()
        .setDescription(''+ message.mentions.users.first() + ' you have been patted by '+ message.author.toString())
        .setColor(embedcolor)
        .setImage(`${imageArray[pat]}`)
        message.channel.send({embed: embed});
    } else {
        if (!message.mentions.users.first()) {
            const embed = new RichEmbed()
            .setDescription("Yoruichi patted you **giggles** :heart: ")
            .setColor(embedcolor)
            .setImage(`${imageArray[pat]}`)
            message.channel.send({embed: embed});
        }
    }
}
};