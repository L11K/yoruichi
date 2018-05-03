const commando = require('discord.js-commando');
const { shuffle } = require('../../assets/util/Util');
const { RichEmbed } = require('discord.js');
module.exports = class KissMarryKillCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'kiss-marry-kill',
			aliases: ['kimaki','kiss-kill-marry', 'kill-kiss-marry', 'kill-marry-kiss', 'marry-kiss-kill', 'marry-kill-kiss'],
			group: 'random',
			memberName: 'kiss-marry-kill',
			description: 'Determines who to kiss, who to marry, and who to kill.',
			args: [
				{
					key: 'first',
					label: 'first name',
					prompt: 'Who is the first person you choose?',
					type: 'string',
					max: 500
				},
				{
					key: 'second',
					label: 'second name',
					prompt: 'Who is the second person you choose?',
					type: 'string',
					max: 500
				},
				{
					key: 'third',
					label: 'third name',
					prompt: 'Who is the third person you choose?',
					type: 'string',
					max: 500
				}
			]
		});
	}

	run(message, { first, second, third }) {
        const things = shuffle([first, second, third]);
        var embedcolor = '#' + ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6);
        let embed = new RichEmbed()
        .setAuthor('Kiss / Marry / Kill', this.client.user.displayAvatarURL)
        .setThumbnail(this.client.user.displayAvatarURL)
		.setDescription(`I'd kiss **${things[0]}**, marry **${things[1]}**, and kill **${things[2]}**.`)
		.setColor(embedcolor);
        return message.channel.send({embed: embed});
	}
};