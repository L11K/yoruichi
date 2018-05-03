const commando = require("discord.js-commando");

module.exports = class AutoRoleCommand extends commando.Command {
        constructor(client) {
                super(client, {
                        name: "autorole",
                        aliases: ["joinrole", "auto-role", "join-role"],
                        group: "moderation",
                        memberName: "autorole",
                        description: "Sets an role where new members instantly get the role",
                        guildOnly: true,
                        userPermissions: ['ADMINISTRATOR'],
                        args: [
                                {
                                        key: "role",
                                        prompt: "What would be the role for new members?\n",
                                        type: "role"
                                }
                        ]
                });
        }
        async run(message, args) {
                const { role } = args;
                await message.guild.settings.set("autoRole", role.id);
                return message.channel.send(`Succesfully set Autorole to ${role.name} in this server`);
        }
};