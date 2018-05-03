const commando = require("discord.js-commando");

module.exports = class WelcomeMessageCommand extends commando.Command {
        constructor(client) {
                super(client, {
                        name: "welcomemsg",
                        aliases: ["welcome-msg", "welcome-message"],
                        group: "moderation",
                        memberName: "welcomemsg",
                        description: "Sets a welcome/bye message for new users",
                        details: "Placeholder:\n<user>: Username, <server>: Guild name, <mention>: User mention",
                        guildOnly: true,
                        userPermissions: ['ADMINISTRATOR'],
                        args: [
                                {
                                        key: "type",
                                        prompt: "Which message would you like to change? Please enter either `welcomeMsg` or `byeMsg`\n",
                                        type: "string",
                                        validate: (type) => {
                                                if (["welcomeMsg", "byeMsg"].includes(type)) return true;
                                                else return "Please type either `welcomeMsg` or `byeMsg`\n";
                                        }
                                },
                                {
                                        key: "message",
                                        prompt: "What should be sent to the channel? Use <user> (username), <server> (server name), and <mention> (user mention) as placeholders\n",
                                        type: "string",
                                        validate: (message) => {
                                                if (message.length < 250) return true;
                                                else return "Invalid welcome message. Message must be under 150 characters\n";
                                        }
                                }
                        ]
                });
        }

        async run(msg, args) {
                const { type, message } = args;
                if (type === "welcomeMsg") {
                        await msg.guild.settings.set("welcomeMsg", message);
                        return msg.channel.send(`Succesfully set welcome message \`"${message}"\` in this server`);
                } else {
                        await msg.guild.settings.set("byeMsg", message);
                        return msg.channel.send(`Succesfully set leave message \`"${message}"\` in this server`);
                }
        }
};