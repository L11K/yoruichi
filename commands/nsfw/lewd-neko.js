const commando = require('discord.js-commando');
const { get } = require(`snekfetch`);

module.exports = class e621Command extends commando.Command {
	constructor (client) {
		super(client, {
			name: 'lewd-neko',
		    memberName: 'lewd-neko',
			group: 'nsfw',
			aliases: ['ln', 'lewd-kitty', 'kitty'],
			description: 'Send lewd neko images.',
			examples: ['lewd-neko'],
			guildOnly: false,
			
		});
    }
  
    async run(message, args) {
        if (!message.channel.nsfw) return message.channel.send(`Must use in a NSFW channel`)
        get(`https://nekos.life/api/lewd/neko`).then(data => {
			message.channel.send({ files: [data.body.neko] })
		})
    }

};