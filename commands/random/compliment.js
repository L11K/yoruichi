const commando = require('discord.js-commando');
const compliments = require('../../assets/json/compliment');
const { RichEmbed } = require('discord.js');
module.exports = class ComplimentCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'compliment',
            group: 'general',
            memberName: 'compliment',
            description: 'Compliments a user.',
            args: [
                {
                    key: 'user',
                    prompt: 'What user do you want to compliment?',
                    type: 'user',
                    default: message => message.author
                }
            ]
        });
    }

    run(message, { user }) {
        var embedcolor = '#' + ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6);
        let embed = new RichEmbed()
			.setDescription(`${message.author}, ${compliments[Math.floor(Math.random() * compliments.length)]}`)
			.setColor(embedcolor);
            return message.channel.send({embed: embed});
    }
};