const { RichEmbed } = require('discord.js');
const commando = require('discord.js-commando');
const moment = require('moment');
module.exports = class ServerInfoCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'server-info',
			aliases: ['server', 'sinfo'],
			group: 'info',
			memberName: 'server',
			description: 'Get info on the server.',
			details: `Get detailed information on the server.`,
			guildOnly: true,
			throttling: {
				usages: 2,
				duration: 3
			}
		});
	}

	run(message) {
        var embedcolor = '#' + ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6);
        let embed = new RichEmbed()
			.setDescription('Server info:', message.guild.iconURL)
			.setColor(embedcolor)
			.setThumbnail(message.guild.iconURL)
			.addField("Name", `${message.guild.name}`, true)
			.addField("ID", `${message.guild.id}`, true)
            .addField("Owner", `${message.guild.owner.user.tag}`, true)
            .addField("Text Channels", `${message.guild.channels.filter(ch => ch.type === 'text').size}`,true)
            .addField("Voice Channels", `${message.guild.channels.filter(ch => ch.type === 'voice').size}`, true)
            .addField("Members", `${message.guild.memberCount}`,true)
            .addField("Roles", `${message.guild.roles.size}`, true)
            .addField('Highest Role', message.guild.roles.sort((a, b) => a.position - b.position || a.id - b.id).last().name, true)
            .addField("Region", `${message.guild.region}`, true)
            .addField("Verification Level", `${message.guild.verificationLevel}`, true)
			.addField("Afk Channel", `${message.guild.afkChannel}`, true)
			.addField("Online Members", `${message.guild.presences.array().length}`, true);
		return message.channel.send({embed: embed});
		
		
}
};
