const commando = require('discord.js-commando');
const { stripIndents } = require('common-tags');
const snekfetch = require('snekfetch');
const { shuffle, list } = require('../../assets/util/Util');
const types = ['multiple', 'boolean'];
const difficulties = ['easy', 'medium', 'hard'];
const choices = ['A', 'B', 'C', 'D'];
const { RichEmbed } = require('discord.js');
module.exports = class QuizCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'quiz',
			aliases: ['jeopardy'],
			group: 'random',
			memberName: 'quiz',
			description: 'Answer a quiz question.',
			details: stripIndents`
				**Types**: ${types.join(', ')}
				**Difficulties**: ${difficulties.join(', ')}
			`,
			args: [
				{
					key: 'type',
					prompt: `Which type of question would you like to have? Either ${list(types, 'or')}.`,
					type: 'string',
					default: 'multiple',
					oneOf: types,
					parse: type => type.toLowerCase()
				},
				{
					key: 'difficulty',
					prompt: `What should the difficulty of the game be? Either ${list(difficulties, 'or')}.`,
					type: 'string',
					default: '',
					oneOf: difficulties,
					parse: difficulty => difficulty.toLowerCase()
				}
			]
		});
	}

	async run(message, { type, difficulty }) {
		try {
			const { body } = await snekfetch
				.get('https://opentdb.com/api.php')
				.query({
					amount: 1,
					type,
					encode: 'url3986',
					difficulty
				});
			if (!body.results) return message.reply('Oh no, a question could not be fetched. Try again later!');
			const answers = body.results[0].incorrect_answers.map(answer => decodeURIComponent(answer.toLowerCase()));
			const correct = decodeURIComponent(body.results[0].correct_answer.toLowerCase());
			answers.push(correct);
            const shuffled = shuffle(answers);
            var embedcolor = '#' + ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6);
            let embed = new RichEmbed()
                .setAuthor('Random quiz', 'https://cdn3.iconfinder.com/data/icons/brain-games/1042/Quiz-Games.png')
                .setColor(embedcolor)
                .setThumbnail('https://cdn3.iconfinder.com/data/icons/brain-games/1042/Quiz-Games.png')
                .setDescription(`**You have 15 seconds to answer this question.** \n ${decodeURIComponent(body.results[0].question)} \n${shuffled.map((answer, i) => `**${choices[i]}**. ${answer}`).join('\n')}`)
			await message.channel.send(embed);
			const filter = res => res.author.id === message.author.id && choices.includes(res.content.toUpperCase());
			const messages = await message.channel.awaitMessages(filter, {
				max: 1,
				time: 15000
			});
			if (!messages.size) return message.channel.send(`Sorry, time is up! It was ${correct}.`);
			const win = shuffled[choices.indexOf(messages.first().content.toUpperCase())] === correct;
			if (!win) return message.channel.send(`Nope, sorry, it's ${correct}.`);
			return message.channel.send('Nice job! 10/10! You deserve some cake!');
		} catch (err) {
			return message.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
		}
	}
};