const commando = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
module.exports = class ChooseCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'chooseuser',
			aliases: ['pick-user'],
			group: 'random',
			memberName: 'chooseuser',
			description: 'Randomly choose a user.',
		});
	}

	run(message, args) {
        var embedcolor = '#' + ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6);
        let embed = new RichEmbed()
            .setThumbnail(this.client.user.displayAvatarURL)
			.setDescription(`Congratulation ${message.guild.members.random().displayName}\nYou are really lucky! 🎉`)
			.setColor(embedcolor);
            message.channel.send({embed: embed}).then(m=>m.react('🎉'));
            
	}
};