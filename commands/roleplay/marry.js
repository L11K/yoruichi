const commando = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
module.exports = class MarryCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'marry',
			aliases: ['m', 'couple'],
			group: 'roleplay',
			memberName: 'marry',
			description: 'Marry with a user.',
            examples : ['marry {user}', 'marry Lisanna'],
            args: [
				{
					key: 'user',
					prompt: 'Who do you want to marry?',
					type: 'string',
					max: 1950
				}
			]
		});
	}
    run(message, { user }) {
        
        var embedcolor = '#' + ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6);
        let embed = new RichEmbed()
			.setDescription(`**${message.author.username}** marries **${user}**`)
			.setImage('https://image.ibb.co/nmtHKH/wedding.gif')
			.setColor(embedcolor);
            return message.channel.send({embed: embed});
    }
};