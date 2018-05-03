const commando = require('discord.js-commando');

module.exports = class idleCommand extends commando.Command {
	constructor (client) {
		super(client, {
			'name': 'idle',
			'memberName': 'idle',
			'group': 'owner',
			'aliases': ['away', 'afk'],
			'description': 'Sets bots status to Idle',
			'examples': ['idle'],
			'guildOnly': false
		});
	}
    run (message) {
		if (message.author.id == '366677235597574155') {
		this.client.user.setPresence({'status': 'idle'}).then(message.channel.send('My status has been set to idle' + ' ' + message.author.tag + '!'));
		} else {
			if (message.author.id !== '366677235597574155') {
				message.channel.send("You're not my owner.")
			}
		}
	}
};