const Commando = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const path = require('path');
const sqlite = require('sqlite');
const canvas = require('canvas');
const client = new Commando.Client({
    'owner': '366677235597574155',
    'prefix': '!',
    'disableEveryone': true,
    'unknownCommandResponse': false
});


client.setProvider(
    sqlite.open(path.join(__dirname, 'settings.sqlite3')).then(db => new Commando.SQLiteProvider(db))
).catch(console.error);

client.registry
    .registerGroups([
        ['avatar-edit', 'Avatar Edit Commands'],
        ['events', 'Events Commands'],
        ['game', 'Game Commands'],
        ['general', 'General Commands'],
        ['info', 'Information Commands'],
        ['image-edit', 'Image Edit Commands'],
        ['moderation', 'Moderation Commands'],
        ['nsfw', 'NSFW Commands'],
        ['owner', 'Owner Commands'],
        ['random', 'Random Commands'],
        ['roleplay', 'Roleplay Commands'],
        ['search', 'Search Commands'],
    ])
    .registerDefaults()
    .registerCommandsIn(path.join(__dirname, 'commands'));

client.on('ready', () => {
        console.log('Logged in!');
        client.user.setActivity(`!help --// on ${client.guilds.size} servers!!`);
});
client.on("guildCreate", guild => {
  // This event triggers when the bot joins a guild.
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  client.user.setActivity(`!help --// on ${client.guilds.size} servers`);
});

client.on("guildDelete", guild => {
  // this event triggers when the bot is removed from a guild.
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  client.user.setActivity(`!help --// on ${client.guilds.size} servers`);
});
client.login(process.env.BOT_TOKEN);
client.on("guildMemberAdd", (member, user) => {
    const role = member.guild.roles.get(member.guild.settings.get("autoRole"));
    if (role && member.guild.me.hasPermission("MANAGE_ROLES")) {
        member.addRole(role);
    }
    const channel = member.guild.channels.find('topic', 'welcome!');
    if (!channel || !channel.permissionsFor(client.user).has("SEND_MESSAGES")) return;
    const msg = member.guild.settings.get("welcomeMsg", "Welcome, <user>~")
            .replace(/(<user>)/gi, member.user.username)
            .replace(/(<server>)/gi, member.guild.name)
            .replace(/(<mention>)/gi, member);
        const embed = new RichEmbed()
        .setThumbnail(member.user.displayAvatarURL)
        .setColor("#00B5B5")
        .setAuthor('Welcome', 'https://cdn.discordapp.com/avatars/439327447859855360/bb0aad7e628414b5ffae6fa97f0b291a.png?size=2048')
        .setDescription(msg)
        .addField('This member is a Bot?', member.user.bot ? 'Yes' : 'No', true)
        .setFooter(`You're ${member.guild.name}'s, ${member.guild.memberCount}th Member!`);
        channel.send({embed: embed});
})
client.on("guildMemberRemove", (member) => {
    const channel = member.guild.channels.find('topic', 'goodbye!');
    if (!channel || !channel.permissionsFor(client.user).has("SEND_MESSAGES")) return;
    const msg = member.guild.settings.get("byeMsg", "Bye, <user> :(")
            .replace(/(<user>)/gi, member.user.username)
            .replace(/(<server>)/gi, member.guild.name)
            .replace(/(<mention>)/gi, member);
            const embed = new RichEmbed()
        .setThumbnail(member.user.displayAvatarURL)
        .setColor("#00B5B5")
        .setAuthor('Welcome', 'https://cdn.discordapp.com/avatars/439327447859855360/bb0aad7e628414b5ffae6fa97f0b291a.png?size=2048')
        .setDescription(msg)
        .setFooter(`${member.guild.name} now only has ${member.guild.memberCount} Members :(`);
        channel.send({embed: embed});
})

