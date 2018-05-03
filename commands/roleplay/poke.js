const commando = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
module.exports = class pokeCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'pokes',
			group: 'roleplay',
			memberName: 'pokes',
			description: 'pokes a user.',
            examples : ['poke {user}', 'poke Lisanna']
		});
	}


run(message, args) {
    var imageArray = require('../../assets/actions/poke');
    var poke = [Math.floor(Math.random() * imageArray.length)]
        if (message.mentions.users.first()) {
            var embedcolor = '#' + ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6);
        const embed = new RichEmbed()
        .setDescription(''+ message.mentions.users.first() + ' you have been poked by '+ message.author.toString())
        .setColor(embedcolor)
        .setImage(`${imageArray[poke]}`)
        message.channel.send({embed: embed});
    } else {
        if (!message.mentions.users.first()) {
            const embed = new RichEmbed()
            .setDescription("Yoruichi pokes you **giggles** :heart: ")
            .setColor(embedcolor)
            .setImage(`${imageArray[poke]}`)
            message.channel.send({embed: embed});
        }
    }
}
};