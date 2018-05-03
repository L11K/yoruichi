const commando = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
module.exports = class poutCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'pouts',
			group: 'roleplay',
			memberName: 'pouts',
			description: 'pouts a user.',
            examples : ['pouts {user}', 'pouts Lisanna']
		});
	}


run(message, args) {
    var imageArray = require('../../assets/actions/pout');
    var pout = [Math.floor(Math.random() * imageArray.length)]
        if (message.mentions.users.first()) {
            var embedcolor = '#' + ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6);
        const embed = new RichEmbed()
        .setDescription('' + message.author.toString() + ' pouts at '+ message.mentions.users.first())
        .setColor(embedcolor)
        .setImage(`${imageArray[pout]}`)
        message.channel.send({embed: embed});
    } else {
        if (!message.mentions.users.first()) {
            const embed = new RichEmbed()
            .setDescription("Yoruichi pouts at you **blushes** :heart: ")
            .setColor(embedcolor)
            .setImage(`${imageArray[pout]}`)
            message.channel.send({embed: embed});
        }
    }
}
};