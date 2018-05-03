const commando = require('discord.js-commando');
const snekfetch = require('snekfetch');

module.exports = class MemeCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'meme',
			group: 'image-edit',
			memberName: 'meme',
			description: 'Sends a meme with the text and background of your choice.',
			clientPermissions: ['ATTACH_FILES'],
			args: [
				{
					key: 'type',
					prompt: 'What meme type do you want to use?',
					type: 'string',
					parse: type => encodeURIComponent(type)
				},
				{
					key: 'top',
					prompt: 'What should the top row of the meme to be?',
					type: 'string',
					max: 200,
					parse: top => encodeURIComponent(top)
				},
				{
					key: 'bottom',
					prompt: 'What should the bottom row of the meme to be?',
					type: 'string',
					max: 200,
					parse: bottom => encodeURIComponent(bottom)
				}
			]
		});
	}

	async run(message, { type, top, bottom }) {
		try {
			const search = await snekfetch.get(`https://memegen.link/api/search/${type}`);
			if (!search.body.length) return message.channel.send('Could not find any results.');
			const { body } = await snekfetch.get(search.body[0].template.blank.replace(/\/_/, `/${top}/${bottom}`));
			return message.channel.send({ files: [{ attachment: body, name: 'meme.jpg' }] });
		} catch (err) {
			return message.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
		}
	}
};