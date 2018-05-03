const commando = require('discord.js-commando');
const request = require('superagent');
const { RichEmbed } = require('discord.js');
const { get } = require("snekfetch");
module.exports = class cat extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'cat',
			group: 'search',
			memberName: 'cat',
			description: 'Meow!',
			details: `Outputs a random cat.`,
			examples: ['cat']
		});
	}

	async run(message) {
		try {
                get('https://aws.random.cat/meow').then(res => {
                    const embed = new RichEmbed()
                    .setImage(res.body.file)
                    return message.channel.send({embed});
                });
            } catch(err) {
                return message.channel.send(error.stack);
            }
        }
};