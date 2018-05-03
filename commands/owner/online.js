const commando = require('discord.js-commando');

module.exports = class onlineCommand extends commando.Command {
	constructor (client) {
		super(client, {
			'name': 'online',
			'memberName': 'online',
			'group': 'owner',
			'aliases': ['here', 'green'],
			'description': 'Set bots status to online',
			'examples': ['online'],
			'guildOnly': false
		});
	}
    run (message) {
		if (message.author.id == '366677235597574155') {
		this.client.user.setPresence({'status': 'online'}).then(message.channel.send('My status has been set to online' + ' ' + message.author.tag + '!'));
		} else {
			if (message.author.id !== '366677235597574155') {
				message.channel.send("You're not my owner.")
			}
		}
	}
};