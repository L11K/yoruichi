const { RichEmbed } = require('discord.js');
const commando = require('discord.js-commando');
const vibrant = require('node-vibrant');
module.exports = class avatarCommand extends commando.Command {
	constructor (client) {
		super(client, {
			'name': 'avatar',
			'aliases': ['ava'],
			'group': 'info',
			'memberName': 'avatar',
			'description': 'Gets the avatar from a user',
			'examples': ['avatar {member name or ID} {image size (optional)}', 'avatar user 2048'],
			'guildOnly': true,

			'args': [
				{
					'key': 'member',
					'prompt': 'What user would you like to get the avatar from?',
					'type': 'member',
					'label': 'member name or ID'
				},
				{
					'key': 'size',
					'prompt': 'What size do you want the avatar to be? (Valid sizes: 128, 256, 512, 1024, 2048)',
					'type': 'integer',
					'label': 'size of the avatar',
					'default': 128,
					'validate': (size) => {
						const validSizes = ['128', '256', '512', '1024', '2048'];

						if (validSizes.includes(size)) {
							return true;
						}

						return `Has to be one of ${validSizes.join(', ')}`;
					}
				}
			]
		});
		this.embedColor = '#FF0000';
	}

	

	async fetchColor (img) {

		const palette = await vibrant.from(img).getPalette();

		if (palette) {
			const pops = [],
				swatches = Object.values(palette);

			let prominentSwatch = {};

			for (const swatch in swatches) {
				if (swatches[swatch]) {
					pops.push(swatches[swatch]._population); 
				}
			}

			const highestPop = pops.reduce((a, b) => Math.max(a, b)); 

			for (const swatch in swatches) {
				if (swatches[swatch]) {
					if (swatches[swatch]._population === highestPop) { 
						prominentSwatch = swatches[swatch];
						break;
					}
				}
			}
			this.embedColor = prominentSwatch.getHex();
		}

		return this.embedColor;
	}

	fetchExt (str) {
		return str.substring(str.length - 14, str.length - 8);
	}

	async run (message, args) {
		const ava = args.member.user.displayAvatarURL,
			embed = new RichEmbed(),
			ext = this.fetchExt(ava),
			avaColor = ext.includes('gif') ? await this.fetchColor(ava) : this.embedColor;

		embed
			.setColor(avaColor)
			.setImage(ext.includes('gif') ? `${ava}&f=.gif` : ava)
			.setTitle(args.member.displayName)
			.setURL(ava)
			.setDescription(`[Direct Link](${ava})`);

		return message.channel.send(embed);
	}
};