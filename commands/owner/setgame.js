const commando = require('discord.js-commando');

module.exports = class setGameCommand extends commando.Command {
	constructor (client) {
		super(client, {
			'name': 'setgame',
			'memberName': 'setgame',
			'group': 'owner',
			'aliases': ['setplay', 'stp'],
			'description': 'Set bots game',
			'examples': ['setgame <game>'],
			'guildOnly': false
		});
	}
    run (message) {
		if (message.author.id === '366677235597574155') {
        let game = args.join(' ')
        this.client.user.setActivity(game).then(message.reply("Here my new playing status : " + game))
      } else {
        if (!message.author.id === '366677235597574155') {
            message.channel.send("You're not my owner.")
        }
    }
	}
};
