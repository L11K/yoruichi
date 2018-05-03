const commando = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const snekfetch = require('snekfetch');
const { stripIndents } = require('common-tags');
const { shorten } = require('../../assets/util/Util');

module.exports = class YuGiOhCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'yu-gi-oh',
			aliases: ['yu-gi-oh-card', 'ygo-card', 'ygo'],
			group: 'search',
			memberName: 'yu-gi-oh',
			description: 'Responds with info on a Yu-Gi-Oh! card.',
			clientPermissions: ['EMBED_LINKS'],
			args: [
				{
					key: 'card',
					prompt: 'What card would you like to get information on?',
					type: 'string'
				}
			]
		});
	}

	async run(message, { card }) {
		try {
			const { raw } = await snekfetch
				.get('https://www.ygohub.com/api/card_info')
				.query({ name: card });
			const body = JSON.parse(raw.toString());
			if (body.status === 'error') return message.channel.send('Could not find any results.');
			const data = body.card;
			const embed = new RichEmbed()
				.setColor(0xBE5F1F)
				.setTitle(data.name)
				.setDescription(shorten(data.text))
				.setAuthor('Yu-Gi-Oh!', 'https://i.imgur.com/AJNBflD.png', 'http://www.yugioh-card.com/')
				.setURL(data.tcgplayer_link)
				.setThumbnail(data.image_path)
				.addField('❯ Card Type', data.type, true);
			if (data.is_monster) {
				embed
					.addField('❯ Species', data.species, true)
					.addField('❯ Attribute', data.attribute, true)
					.addField('❯ Level', data.stars, true)
					.addField('❯ ATK', data.attack, true)
					.addField('❯ DEF', data.defense, true);
			}
			embed.addField('❯ Legality', stripIndents`
				TCG Advanced: ${data.legality.TCG.Advanced}
				TCG Traditional: ${data.legality.TCG.Traditional}
				OCG Advanced: ${data.legality.OCG.Advanced}
			`);
			return message.channel.send(embed);
		} catch (err) {
			return message.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
		}
	}
};