const { RichEmbed } = require('discord.js');
const commando = require('discord.js-commando');
const moment = require('moment');
require('moment-duration-format');
const { stripIndents } = require('common-tags');

const { version } = require('../../package');

module.exports = class StatsCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'stats',
			aliases: ['statistics'],
			group: 'info',
			memberName: 'stats',
			description: 'Displays statistics about the bot.',
			guildOnly: true,
			throttling: {
				usages: 2,
				duration: 3
			}
		});
	}

	run(message) {
		var embedcolor = '#' + ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6);
        let embed = new RichEmbed()
			.setDescription('**Statistics**', this.client.user.displayAvatarURL)
			.setColor(embedcolor)
			.setThumbnail(this.client.user.displayAvatarURL)
			.addField('Bot name', this.client.user.tag, true)
			.addField('Uptime', moment.duration(this.client.uptime).format('DD [days], HH [hours and] mm [minutes]'), true)
			.addField("Memory Usage", `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB`, true)
            .addField("Guilds", `${this.client.guilds.size}`, true)
			.addField("Channels", `${this.client.channels.size}`, true)
			.addField("Users", `${this.client.guilds.map(guild => guild.memberCount).reduce((a, b) => a + b)}`, true)
			.addField("Version", `v${version}`, true)
			.addField("Library:", `Discord.js-Commando`, true)
			.addField("Language:", `Node.JS ${process.version}`, true)
			.addField("Code editor:", "Visual Studio Code", true)
			.addField("Click the emoji", `[🤖](https://discordapp.com/oauth2/authorize?client_id=439327447859855360&scope=bot&permissions=2146958591)`, true);
		return message.channel.send({embed: embed});
		
	}
};