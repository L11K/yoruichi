const YouTube = require('youtube-node');
const moment = require('moment');
const youtube = new YouTube();
const  commando = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
youtube.setKey("AIzaSyCicVIV4BXjNsxTKlgkvu14qB92fVUZYVU");
youtube.addParam('type', 'video');
youtube.addParam('relevanceLanguage', 'en');
youtube.addParam('safeSearch', 'moderate');
youtube.addParam('regionCode', 'US');

module.exports = class youtubeCommand extends commando.Command {
constructor (client) {
    super(client, {
        name: 'yt',
        group: 'search',
        aliases: ['youtb', 'tube'],
        memberName: 'yt',
        description: 'Find videos on youtube, and send the video to the channel.',
        examples: ['youtube {videoName}', 'youtube RWBY Volume 4'],
        guildOnly: false,

        args: [
            {
                'key': 'query',
                'prompt': 'What kind of video do you want to find?',
                'type': 'string',
                'label': 'Video to find'
            }
        ]
    });
}



run (message, args) {

    youtube.search(args.query, 1, (error, result) => {
        if (error) {
            console.error(error); 

            return message.reply('⚠ No results found');
        } else if (!result || !result.items || result.items.length < 1) {
            message.say('No Results found');

            return message.delete(1000);
        }
        return message.channel.send(`https://www.youtube.com/watch?v=${result.items[0].id.videoId}`);
        
        
    });
}
};