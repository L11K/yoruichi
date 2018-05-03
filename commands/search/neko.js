const commando = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const { get } = require("snekfetch");
module.exports = class cat extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'neko',
			group: 'search',
			memberName: 'neko',
			description: 'Meow!',
			details: `Outputs a random nekos.`,
			examples: ['neko']
		});
	}

	async run(message) {
		get(`https://nekos.life/api/neko`).then(data => {
			message.channel.send({ files: [data.body.neko] })
		})
        
    }
};