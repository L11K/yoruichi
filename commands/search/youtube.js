const YouTube = require('youtube-node');
const moment = require('moment');
const youtube = new YouTube();
const commando = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
youtube.setKey(process.env.YOUTUBE_API);
youtube.addParam('type', 'video');
youtube.addParam('relevanceLanguage', 'en');
youtube.addParam('safeSearch', 'moderate');
youtube.addParam('regionCode', 'US');

module.exports = class youtubeCommand extends commando.Command {
constructor (client) {
    super(client, {
        name: 'youtube',
        group: 'search',
        aliases: ['ytb', 'ytube'],
        memberName: 'youtube',
        description: 'Find videos on youtube',
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

        const youtubeEmbed = new RichEmbed();

        youtubeEmbed
            .setAuthor(`Youtube Search Result for: ${args.query}`, 'https://i.imgur.com/BPFqnxz.png')
            .setImage(result.items[0].snippet.thumbnails.high.url)
            .setURL(`https://www.youtube.com/watch?v=${result.items[0].id.videoId}`)
            .setColor(message.member !== null ? message.member.displayHexColor : '#FF0000')
            .addField('Title', result.items[0].snippet.title, true)
            .addField('URL', `[Click Here](https://www.youtube.com/watch?v=${result.items[0].id.videoId})`, true)
            .addField('Channel', `[${result.items[0].snippet.channelTitle}](https://www.youtube.com/channel/${result.items[0].snippet.channelId})`, true);
        result.items[0].snippet.description !== ''
            ? youtubeEmbed.addField('Description', result.items[0].snippet.description, false)
            : youtubeEmbed.addField('Description', 'No description', false);

        return message.channel.send(youtubeEmbed);
    });
}
};
