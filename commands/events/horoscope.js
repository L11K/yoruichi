const commando = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const snekfetch = require('snekfetch');
const { list } = require('../../assets/util/Util');
const signs = require('../../assets/json/horoscope');

module.exports = class HoroscopeCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'horoscope',
			group: 'events',
			memberName: 'horoscope',
			description: 'Responds with today\'s horoscope for a specific Zodiac sign.',
			details: `**Signs**: ${signs.join(', ')}`,
			clientPermissions: ['EMBED_LINKS'],
			args: [
				{
					key: 'sign',
					prompt: `Which sign would you like to get the horoscope for?`,
					type: 'string',
					oneOf: signs,
					parse: sign => sign.toLowerCase()
				}
			]
		});
	}

	async run(message, { sign }) {
		try {
			const { raw } = await snekfetch.get(`http://sandipbgt.com/theastrologer/api/horoscope/${sign}/today/`);
			const body = JSON.parse(raw.toString());
			const embed = new RichEmbed()
				.setColor(0x9797FF)
				.setTitle(`Horoscope for ${body.sunsign}...`)
				.setURL(`https://new.theastrologer.com/${body.sunsign}/`)
				.setDescription(body.horoscope)
				.addField('❯ Mood', body.meta.mood, true)
				.addField('❯ Intensity', body.meta.intensity, true)
				.addField('❯ Date', body.date, true);
			return message.channel.send(embed);
		} catch (err) {
			return message.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
		}
	}
};