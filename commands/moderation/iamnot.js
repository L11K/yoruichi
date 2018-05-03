const commando = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
module.exports = class IamnotCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'iamnot',
			aliases: ['leave'],
			group: 'moderation',
			memberName: 'iamnot',
			description: 'Remove the specific self-role from you.',
			guildOnly: true,
			clientPermissions: ['MANAGE_ROLES'],
			args: [
				{
					key: 'role',
					prompt: 'Which role you want to remove?',
					type: 'role'
				}
			]
		});
	}

	async run(message, { role }) {
		const roles = message.guild.settings.get('selfRoles', []);
		if (!roles.includes(role.id)) return message.channel.send('This role is not a selfrole!');
		if (!role.editable) return message.channel.send('I do not have permission to manage this role!');
		if (!message.member.roles.has(role.id)) return message.channel.send('You are not a member of this role!');
		await message.guild.member(message.author).removeRole(role);
		var embedcolor = '#' + ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6);
		let embed = new RichEmbed()
		.setColor(embedcolor)
		.setDescription(`${message.author.tag} you leave **${role.name}** role!!`);
		return message.channel.send({embed: embed});
	}
};
