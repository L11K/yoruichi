const commando = require('discord.js-commando');
const { RichEmbed } = require('discord.js');

module.exports = class BanCommand extends commando.Command {
	constructor(client) {
		super(client, {
		  name: 'ban',
		  group: 'moderation',
		  memberName: 'ban',
		  description: 'Ban a user from the server',
		  guildOnly: true,
		  args: [
			{
			  key: 'member',
			  prompt: 'Specify a user to ban',
			  type: 'member'
			},
			{
			  key: 'reason',
			  prompt: 'Provide a reason for the ban',
			  type: 'string',
			  default: 'no reason provided'
			}
		  ]
		});
	  }
	
	  async run(message, {member, reason}) {
		if(message.member.hasPermission('BAN_MEMBERS')) {
		  if(member.bannable) {
			member.ban(reason);
			var embedcolor = '#' + ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6);
			let embed = new RichEmbed()
			.setColor(embedcolor)
			.setDescription(message.author + ' banned ' + member + '! **Reason:** ' + reason);
			return message.channel.send({embed: embed});
			}
		  else {
			message.channel.send('Unable to ban that user');
		  }
		}
		else {
		  message.channel.send('You can not use this command because you lack the Ban Members permission');
		}
	  }
	}