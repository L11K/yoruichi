const commando = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
module.exports = class FixselfRolesCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'fixselfroles',
			aliases: ['fix-roles'],
			group: 'moderation',
			memberName: 'fixselfroles',
			description: 'Removes no longer existent roles from the self-roles lists.',
			ownerOnly: true
		});
	}

	run(message) {
		let count = 0;
		for (const guild of this.client.guilds.values()) {
			const roles = guild.settings.get('selfRoles', []);
			if (!roles.length) continue;
			for (const role of roles) {
				if (guild.roles.has(role)) continue;
				roles.splice(roles.indexOf(role), 1);
				count++;
			}
			if (!roles.length) guild.settings.remove('selfRoles');
			else guild.settings.set('selfRoles', roles);
		}
		var embedcolor = '#' + ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6);
		let embed = new RichEmbed()
		.setColor(embedcolor)
		.setDescription(`Cleared **${count}** roles from the self-roles lists.`);
		return message.channel.send({embed: embed});

	}
};