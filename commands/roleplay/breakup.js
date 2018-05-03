const commando = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
module.exports = class divorceCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'divorce',
			aliases: ['breakup'],
			group: 'roleplay',
			memberName: 'divorce',
			description: 'divorce with a user.',
            examples : ['divorce {user}', 'divorce Lisanna'],
            args: [
				{
					key: 'user',
					prompt: 'Who do you want to divorce?',
					type: 'string',
					max: 1950
				}
			]
		});
	}
    run(message, { user }) {
        
        var embedcolor = '#' + ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6);
        let embed = new RichEmbed()
			.setDescription(`**${message.author.username}** divorces **${user}**`)
			.setImage('https://i.gifer.com/96zd.gif')
			.setColor(embedcolor);
            return message.channel.send({embed: embed});
    }
};