const commando = require('discord.js-commando');

module.exports = class DaysUntilCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'days-until',
			group: 'events',
			memberName: 'days-until',
			description: 'Responds with how many days there are until a certain date.',
			args: [
				{
					key: 'month',
					prompt: 'What month would you like to get the days until?',
					type: 'integer'
				},
				{
					key: 'day',
					prompt: 'What day would you like to get the days until?',
					type: 'integer',
					min: 1,
					max: 31
				}
			]
		});
	}

	run(message, { month, day }) {
		const now = new Date();
		let year = now.getMonth() + 1 <= month ? now.getFullYear() : now.getFullYear() + 1;
		if (month === now.getMonth() + 1 && now.getDate() >= day) ++year;
		const future = new Date(`${month}/${day}/${year}`);
		const time = Math.round((future - now) / (1000 * 60 * 60 * 24)) + 1;
		if (!time) return message.reply('Invalid date.');
		return message.channel.send(`There are ${time} days until ${future.toDateString()}!`);
	}
};