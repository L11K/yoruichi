const commando = require('discord.js-commando');
const { stripIndents } = require('common-tags');

module.exports = class DiscriminatorCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'dmatch',
			aliases: ['discrim', 'search-discrim', 'search-discriminator'],
			group: 'info',
			memberName: 'dmatch',
			description: 'Searches for other users with a certain discriminator.',
			args: [
				{
					key: 'discrim',
					label: 'discriminator',
					prompt: 'Which discriminator would you like to search for?',
					type: 'string',
					default: message => message.author.discriminator,
					validate: discrim => {
						if (/^[0-9]+$/.test(discrim) && discrim.length === 4) return true;
						return 'Invalid discriminator.';
					}
				}
			]
		});
	}

	run(message, { discrim }) {
		const users = this.client.users.filter(user => user.discriminator === discrim).map(user => user.username);
		return message.channel.send(stripIndents`\`\`\`md
			Found ${users.length} users with the discriminator #${discrim}
			${users.join(', ')}
            \`\`\``);
	}
};