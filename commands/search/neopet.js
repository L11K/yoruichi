const commando = require('discord.js-commando');
const snekfetch = require('snekfetch');
const { RichEmbed } = require('discord.js');
const { list } = require('../../assets/util/Util');
const moods = {
	happy: 1,
	sad: 2,
	angry: 3,
	sick: 4,
	none: 5
};

module.exports = class NeopetCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'neopet',
			aliases: ['neopets-pet', 'neopet-image', 'neopet-image-finder'],
			group: 'search',
			memberName: 'neopet',
			description: 'Responds with the image of a specific Neopet.',
			args: [
				{
					key: 'pet',
					prompt: 'What pet would you like to get an image of?',
					type: 'string'
				},
				{
					key: 'mood',
					prompt: `What mood should the pet be in? Either ${list(Object.keys(moods), 'or')}.`,
					type: 'string',
					default: 'happy',
					validate: mood => {
						if (moods[mood.toLowerCase()]) return true;
						return `Invalid mood, please enter either ${list(Object.keys(moods), 'or')}.`;
					},
					parse: mood => mood.toLowerCase()
				}
			]
		});
	}

	async run(message, { pet, mood }) {
		try {
			const { raw } = await snekfetch
				.get('http://www.sunnyneo.com/petimagefinder.php')
				.query({
					name: pet,
					size: 5,
					mood: moods[mood]
				});
			const link = raw.toString().match(/http:\/\/pets\.neopets\.com\/cp\/.+\.png/);
            if (!link) return messsage.channel.send('Could not find any results.');
        var embedcolor = '#' + ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6);
        let embed = new RichEmbed()
        .setAuthor('Neopets', this.client.user.displayAvatarURL)
        .setImage(link[0])
		.setColor(embedcolor);
        return message.channel.send({embed: embed});
			
		} catch (err) {
			return messsage.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
		}
	}
};