const commando = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
module.exports = class danceCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'dance',
			group: 'roleplay',
			memberName: 'dance',
			description: 'dance',
            examples : ['dance']
		});
	}


run(message, args) {
    var imageArray = require('../../assets/actions/dance');
    var dance = [Math.floor(Math.random() * imageArray.length)]
    if (!message.mentions.users.first()) {
        var embedcolor = '#' + ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6);
        const embed = new RichEmbed()
        .setDescription('' + message.author.toString() + ' is dancing')
        .setColor(embedcolor)
        .setImage(`${imageArray[dance]}`)
        message.channel.send({embed: embed});
}
}
};