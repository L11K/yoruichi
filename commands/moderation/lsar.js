const commando = require('discord.js-commando');
const { stripIndents } = require('common-tags');
const { RichEmbed } = require('discord.js');
module.exports = class RoleListCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'lsar',
			aliases: ['rolelist', 'ranks'],
			group: 'moderation',
			memberName: 'lsar',
			description: 'Show all self-roles',
			guildOnly: true
		});
	}

	run(message) {
		const roles = message.guild.settings.get('selfRoles', []);
		if (!roles.length) return message.channel.send('This server has no selfroles...');
		
		var embedcolor = '#' + ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6);
		let embed = new RichEmbed()
		.setTitle(`${message.guild.name}`)
		.setColor(embedcolor)
		.setThumbnail(message.guild.iconURL)
		.addField("Self Roles", `${message.guild.roles.filter(role => roles.includes(role.id)).map(role => role.name).join('\n')}`, true);
		return message.channel.send({embed: embed});
	}
};
