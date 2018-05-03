const commando = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
module.exports = class ServerInfoCommand extends commando.Command {
constructor(client) {
    super(client, {
      name: 'kick',
      group: 'moderation',
      memberName: 'kick',
      description: 'Kick a user from the server',
      guildOnly: true,
      args: [
        {
          key: 'member',
          prompt: 'Specify a user to kick',
          type: 'member'
        },
        {
          key: 'reason',
          prompt: 'Provide a reason for the kick',
          type: 'string',
          default: 'no reason provided'
        }
      ]
    });
  }

  async run(message, {member, reason}) {
    if(message.member.hasPermission('KICK_MEMBERS')) {
      if(member.kickable) {
        member.kick(reason);
        var embedcolor = '#' + ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6);
			let embed = new RichEmbed()
			.setColor(embedcolor)
			.setDescription(message.author + ' kicked ' + member + '! **Reason:** ' + reason);
			return message.channel.send({embed: embed});
      }
      else {
        message.channel.send('Unable to kick that user');
      }
    }
    else {
      message.channel.send('You can not use this command because you lack the Kick Members permission');
    }
  }
}