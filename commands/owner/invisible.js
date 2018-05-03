const commando = require('discord.js-commando');

module.exports = class invisibleCommand extends commando.Command {
	constructor (client) {
		super(client, {
			'name': 'invisible',
			'memberName': 'invisible',
			'group': 'owner',
			'aliases': ['off', 'gray'],
			'description': 'Set bots status to invisible',
			'examples': ['invisible'],
			'guildOnly': false
		});
	}
    run (message) {
		if (message.author.id == '366677235597574155') {
		this.client.user.setPresence({'status': 'invisible'}).then(message.channel.send('My status has been set to invisible' + ' ' + message.author.tag + '!'));
		} else {
			if (message.author.id !== '366677235597574155') {
				message.channel.send("You're not my owner.")
			}
		}
	}
};