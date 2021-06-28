const Guild = require('../Database/models/guildSchema');
const Discord = require('discord.js');

module.exports = {
    name: 'settings',
    description: 'Allows the server owner to change the guild settings.',
    async execute(message, args, client) {
        if (message.author.id !== message.guild.ownerID) return message.channel.send("You do not have permission to use this command as you are not the server owner.");
        //!settings
        let guildProfile = await Guild.findOne({ guildID: message.guild.id });
        if (!args.length) {
            let embed = new Discord.MessageEmbed()
                .setTitle(`${message.guild.name}'s Settings:`)
                .setDescription(`If you are seeing no fields below it is because there is nothing assigned for the property\nProperties: prefix, muteRoleID, memberRoleID`)
                .setColor("RED");

            if (guildProfile.prefix) embed.addField(`Prefix:`, guildProfile.prefix);
            if (guildProfile.muteRoleID) embed.addField(`Mute Role ID:`, guildProfile.muteRoleID)
            if (guildProfile.muteRoleID) embed.addField(`Member Role ID:`, guildProfile.memberRoleID)
            message.channel.send(embed);
        } else {
            if (!["prefix", "muteRoleID", "memberRoleID"].includes(args[0])) return message.channel.send("You need to state a valid property to update.");
            if (!args[1]) return message.channel.send("You did not state a value to update the property to.");
            if ("prefix" == args[0]) {
                await Guild.findOneAndUpdate({ guildID: message.guild.id }, { prefix: args[1], lastEdited: Date.now() });
                message.channel.send(`Updated: ${args[0]} to ${args[1]}`);
            } else if ("mutRoleID" === args[0]) {
                await Guild.findOneAndUpdate({ guildID: message.guild.id }, { muteRoleID: args[1], lastEdited: Date.now() });
                message.channel.send(`Updated: ${args[0]} to ${args[1]}`);
            } else if ("memberRoleID" === args[0]) {
                await Guild.findOneAndUpdate({ guildID: message.guild.id }, { memberRoleID: args[1], lastEdited: Date.now() });
                message.channel.send(`Updated: ${args[0]} to ${args[1]}`);
            }
        }
    },
};