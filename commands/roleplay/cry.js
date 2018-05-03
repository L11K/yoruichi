const commando = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
module.exports = class cryCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'cry',
			group: 'roleplay',
			memberName: 'cry',
			description: 'cry',
            examples : ['cry']
		});
	}


run(message, args) {
    var imageArray = require('../../assets/actions/cry');
    var cry = [Math.floor(Math.random() * imageArray.length)]
    if (!message.mentions.users.first()) {
        var embedcolor = '#' + ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6);
        const embed = new RichEmbed()
        .setDescription('' + message.author.toString() + ' is crying')
        .setColor(embedcolor)
        .setImage(`${imageArray[cry]}`)
        message.channel.send({embed: embed});
}
}
};