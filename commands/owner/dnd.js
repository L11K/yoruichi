const commando = require('discord.js-commando');

module.exports = class dndCommand extends commando.Command {
	constructor (client) {
		super(client, {
			'name': 'dnd',
			'memberName': 'dnd',
			'group': 'owner',
			'aliases': ['busy', 'red'],
			'description': 'Sets bots status to Do Not Disturb',
			'examples': ['dnd'],
			'guildOnly': false
		});
	}
    run (message) {
		if (message.author.id == OWNER_ID) {
		this.client.user.setPresence({'status': 'dnd'}).then(message.channel.send('My status has been set to do not disturb' + ' ' + message.author.tag + '!'));
		} else {
			if (message.author.id !== OWNER_ID) {
				message.channel.send("You're not my owner.")
			}
		}
	}
};
