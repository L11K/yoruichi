const { RichEmbed } = require('discord.js');
const commando = require('discord.js-commando');
const moment = require('moment');
module.exports = class userInfoCommand extends commando.Command {
	constructor (client) {
		super(client, {
			'name': 'userinfo',
			'aliases': ['user', 'uinfo'],
			'group': 'info',
			'memberName': 'userinfo',
			'description': 'Gets information about a user.',
			'examples': ['uinfo {user}', 'uinfo Favna'],
			'guildOnly': true,

			'args': [
				{
					'key': 'member',
					'prompt': 'What user would you like to snoop on?',
					'type': 'member',
					'label': 'member name or ID'
				}
			]
		});
	}

	capitalizeFirstLetter (string) {
		return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
	}

	run (message, args, member, user, bot) {
        var embedcolor = '#' + ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6);
        const uinfoEmbed = new RichEmbed(),
            
			vals = {
				'member': args.member,
				'user': args.member.user
            };
            
        uinfoEmbed
			.setAuthor(vals.user.tag)
			.setThumbnail(vals.user.displayAvatarURL)
			.setColor(embedcolor)
			.addField('ID', vals.user.id, true)
			.addField('Name', vals.user.username, true)
			.addField('Nickname', vals.member.nickname ? vals.member.nickname : 'No Nickname', true)
			.addField('Status', vals.user.presence.status !== 'dnd' ? this.capitalizeFirstLetter(vals.user.presence.status) : 'Do Not Disturb', true);
		vals.member.roles.size >= 1 ? uinfoEmbed.setFooter(`${vals.member.displayName} has ${vals.member.roles.size - 1} role(s)`) : uinfoEmbed.setFooter(`${vals.member.displayName} has 0 roles`);

		return message.channel.send(uinfoEmbed);
	}
};