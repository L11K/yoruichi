const commando = require('discord.js-commando');
module.exports = class PokegifsCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'poke-gif',
            group: 'general',
            aliases: ['poke', 'po'],
            memberName: 'poke-gif',
            description: 'Search a pokémon gif',
            examples: ['pokemon pikachu']
           
        });    
    }

    run(message, args) {
        let sprite = message.content.toLowerCase().split(' ').slice(1).join(" ");
        if (!sprite) return message.channel.send("You need to write a pokemon name!! meow~");
        message.channel.send({files: [`http://www.pokestadium.com/sprites/xy/${sprite.replace(/ /g,'-')}.gif`]});
    }
};