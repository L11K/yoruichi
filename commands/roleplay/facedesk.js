const commando = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
module.exports = class facedeskCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'facedesk',
			group: 'roleplay',
			memberName: 'facedesk',
			description: 'facedesk',
            examples : ['facedesk']
		});
	}


run(message, args) {
    var imageArray = require('../../assets/actions/facedesk');
    var facedesk = [Math.floor(Math.random() * imageArray.length)]
    if (!message.mentions.users.first()) {
        var embedcolor = '#' + ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6);
        const embed = new RichEmbed()
        .setDescription('' + message.author.toString() + ' facedesks!')
        .setColor(embedcolor)
        .setImage(`${imageArray[facedesk]}`)
        message.channel.send({embed: embed});
}
}
};