const commando = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
module.exports = class dsarCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'dsar',
			aliases: ['delrank', 'delrole'],
			group: 'moderation',
			memberName: 'dsar',
			description: 'Remove a role from the self-roles.',
			guildOnly: true,
			userPermissions: ['MANAGE_ROLES'],
			args: [
				{
					key: 'role',
					prompt: 'What self-role role do you want to remove?',
					type: 'role'
				}
			]
		});
	}

	run(message, { role }) {
		if (role.id === message.guild.defaultRole.id) return message.channel.send('The everyone role cannot be removed!');
		const roles = message.guild.settings.get('SelfRoles', []);
		if (!roles.includes(role.id)) return message.channel.send(`${role.name} is not self attainable!`);
		roles.splice(roles.indexOf(role.id), 1);
		if (!roles.length) message.guild.settings.remove('SelfRoles');
		else message.guild.settings.set('SelfRoles', roles);
		var embedcolor = '#' + ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6);
		let embed = new RichEmbed()
		.setColor(embedcolor)
		.setDescription(`${role.name} is now removed from selfroles...`);
		return message.channel.send({embed: embed});
		
	}
};