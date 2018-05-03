const commando = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const snekfetch = require('snekfetch');
const { stripIndents } = require('common-tags');
const { verify } = require('../../assets/util/Util');

module.exports = class AkinatorCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'akinator',
			aliases: ['the-web-genie', 'web-genie'],
			group: 'game',
			memberName: 'akinator',
			description: 'Think about a real or fictional character, I will try to guess who it is.',
			clientPermissions: ['EMBED_LINKS']
		});

		this.sessions = new Map();
	}

	async run(message) {
		if (this.sessions.has(message.channel.id)) return message.reply('Only one game may be occuring per channel.');
		try {
			let ans = null;
			this.sessions.set(message.channel.id, { progress: 0 });
			while (this.sessions.get(message.channel.id).progress < 99) {
				const data = ans === null ? await this.createSession(message.channel) : await this.progress(message.channel, ans);
				if (!data || this.sessions.get(message.channel.id).step >= 80) break;
				const answers = data.answers.map(answer => answer.answer.toLowerCase());
				answers.push('end');
				await message.channel.send(stripIndents`
					**${++data.step}.** ${data.question}
					${data.answers.map(answer => answer.answer).join(' | ')}
				`);
				const filter = res => res.author.id === message.author.id && answers.includes(res.content.toLowerCase());
				const messages = await message.channel.awaitMessages(filter, {
					max: 1,
					time: 30000
				});
				if (!messages.size) {
					await message.channel.send('Sorry, time is up!');
					break;
				}
				if (messages.first().content.toLowerCase() === 'end') break;
				ans = answers.indexOf(messages.first().content.toLowerCase());
			}
			const guess = await this.finish(message.channel);
			const embed = new RichEmbed()
				.setColor(0xF78B26)
				.setTitle(`I'm ${Math.round(guess.proba * 100)}% sure it's...`)
				.setDescription(`${guess.name}${guess.description ? `\n_${guess.description}_` : ''}`)
				.setThumbnail(guess.absolute_picture_path);
			await message.embed(embed);
			const verification = await verify(message.channel, message.author);
			this.sessions.delete(message.channel.id);
			if (verification === 0) return message.channel.send('I guess your silence means I have won.');
			if (!verification) return message.channel.send('Bravo, you have defeated me.');
			return message.channel.send('Guessed right one more time! I love playing with you!');
		} catch (err) {
			this.sessions.delete(message.channel.id);
			return message.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
		}
	}

	async createSession(channel) {
		const { body } = await snekfetch
			.get('http://api-en1.akinator.com/ws/new_session')
			.query({
				partner: 1,
				player: 'xiaobot'
			});
		const data = body.parameters;
		if (!data) return null;
		this.sessions.set(channel.id, {
			id: data.identification.session,
			signature: data.identification.signature,
			step: 0,
			progress: Number.parseInt(data.step_information.progression, 10)
		});
		return data.step_information;
	}

	async progress(channel, answer) {
		const session = this.sessions.get(channel.id);
		const { body } = await snekfetch
			.get('http://api-en1.akinator.com/ws/answer')
			.query({
				session: session.id,
				signature: session.signature,
				step: session.step,
				answer
			});
		const data = body.parameters;
		if (!data) return null;
		this.sessions.set(channel.id, {
			id: session.id,
			signature: session.signature,
			step: Number.parseInt(data.step, 10),
			progress: Number.parseInt(data.progression, 10)
		});
		return data;
	}

	async finish(channel) {
		const session = this.sessions.get(channel.id);
		const { body } = await snekfetch
			.get('http://api-en1.akinator.com/ws/list')
			.query({
				session: session.id,
				signature: session.signature,
				step: session.step,
				size: 1,
				mode_question: 0
			});
		return body.parameters.elements[0].element;
	}
};
