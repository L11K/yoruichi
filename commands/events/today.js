const commando = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const snekfetch = require('snekfetch');

module.exports = class TodayInHistoryCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'today-in-history',
			aliases: ['event', 'today', 'history'],
			group: 'events',
			memberName: 'today-in-history',
			description: 'Responds with an event that occurred today in history.',
			clientPermissions: ['EMBED_LINKS'],
			args: [
				{
					key: 'month',
					prompt: 'What month would you like to get an event for?',
					type: 'integer',
					default: ''
				},
				{
					key: 'day',
					prompt: 'What day would you like to get an event for?',
					type: 'integer',
					default: '',
					min: 1,
					max: 31
				}
			]
		});
	}

	async run(message, { month, day }) {
		const date = month && day ? `/${month}/${day}` : '';
		try {
			const { raw } = await snekfetch.get(`http://history.muffinlabs.com/date${date}`);
			const body = JSON.parse(raw.toString());
			const events = body.data.Events;
			const event = events[Math.floor(Math.random() * events.length)];
			const embed = new RichEmbed()
				.setColor(0x9797FF)
				.setURL(body.url)
				.setTitle(`On this day (${body.date})...`)
				.setDescription(`${event.year}: ${event.text}`)
				.addField('❯ See More',
					event.links.map(link => `[${link.title}](${link.link.replace(/\)/g, '%29')})`).join(', '));
			return message.channel.send(embed);
		} catch (err) {
			if (err.statusCode === 404 || err.statusCode === 500) return message.channel.send('Invalid date.');
			return message.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
		}
	}
};