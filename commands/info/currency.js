const commando = require('discord.js-commando');
const snekfetch = require('snekfetch');
const { list } = require('../../assets/util/Util');
const codes = require('../../assets/json/currency');
const { RichEmbed } = require('discord.js');
module.exports = class CurrencyCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'currency',
			aliases: ['currency-convert', 'convert-currency'],
			group: 'info',
			memberName: 'currency',
			description: 'Converts money from one currency to another.',
            details: `**Codes**: ${codes.join(', ')}`,
            examples : ['currency 50 usd eur'],
			args: [
				{
					key: 'amount',
					prompt: 'How much money should be converted? Do not use symbols.',
					type: 'float'
				},
				{
					key: 'base',
					prompt: `What currency code do you want to use as the base?`,
					type: 'string',
					oneOf: codes,
					parse: base => base.toUpperCase()
				},
				{
					key: 'target',
					prompt: `What currency code do you want to convert to?`,
					type: 'string',
					oneOf: codes,
					parse: target => target.toUpperCase()
				}
			]
		});
	}

	async run(message, { base, target, amount }) {
		if (base === target) return message.channel.send(`Converting ${base} to ${target} is the same value, dummy.`);
		try {
			const { body } = await snekfetch
				.get('http://api.fixer.io/latest')
				.query({
					base,
					symbols: target
                });
                const embed = new RichEmbed()
			.addField('Currency', `${amount} ${base} is ${amount * body.rates[target]} ${target}.`, true);
			return message.channel.send(embed);
		} catch (err) {
			return message.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
		}
	}
};