const commando = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const { util: { permissions } } = require('discord.js-commando');

module.exports = class RoleInfoCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'role-info',
			aliases: ['r-info'],
			group: 'info',
			memberName: 'role-info',
			description: 'Responds with detailed information on a role.',
			guildOnly: true,
			clientPermissions: ['EMBED_LINKS'],
			args: [
				{
					key: 'role',
					prompt: 'Which role would you like to get information on?',
					type: 'role'
				}
			]
		});
	}

	run(message, { role }) {
		const embed = new RichEmbed()
			.setColor(role.hexColor)
			.addField('❯ Name', role.name, true)
			.addField('❯ ID', role.id, true)
			.addField('❯ Color', role.hexColor.toUpperCase(), true)
			.addField('❯ Creation Date', role.createdAt.toDateString(), true)
			.addField('❯ Hoisted?', role.hoist ? 'Yes' : 'No', true)
			.addField('❯ Mentionable?', role.mentionable ? 'Yes' : 'No', true)
			return message.channel.send(embed);
	}
};