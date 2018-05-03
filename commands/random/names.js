const commando = require('discord.js-commando');
const { list } = require('../../assets/util/Util');
const names = require('../../assets/json/name');
const all = [].concat(names.male, names.female);
const genders = ['male', 'female'];
const { RichEmbed } = require('discord.js');
module.exports = class NameCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'name',
			group: 'random',
			memberName: 'name',
			description: 'Responds with a random name, with the gender of your choice.',
			args: [
				{
					key: 'gender',
					prompt: `Which gender do you want to generate a name for? Either ${list(genders, 'or')}.`,
					type: 'string',
					oneOf: genders,
					parse: gender => gender.toLowerCase()
				}
			]
		});
	}

	run(message, { gender }) {
		const lastName = names.last[Math.floor(Math.random() * names.last.length)];
        var embedcolor = '#' + ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6);
        let genderembed = new RichEmbed()
        .setAuthor('Random Names', this.client.user.displayAvatarURL)
        .setThumbnail(this.client.user.displayAvatarURL)
		.setDescription(`${names[gender][Math.floor(Math.random() * names[gender].length)]} ${lastName}`)
		.setColor(embedcolor);
        return message.channel.send(genderembed);
	}
};