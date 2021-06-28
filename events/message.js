const Levels = require('discord-xp');
const Blacklist = require('../Database/models/blackListSchema');
const Afk = require('../Database/models/afkSchema');
const mongoose = require('mongoose');
const Balance = require('../Database/models/balanceSchema');
const Guild = require('../Database/models/guildSchema');

module.exports = {
    name: 'message',
    async execute(message, client) {
        if (message.author.bot) return;
        if (message.channel.type == 'dm') return;

        let guildProfile = await Guild.findOne({ guildID: message.guild.id });
        if (!guildProfile) {
            guildProfile = await new Guild({
                _id: mongoose.Types.ObjectId(),
                guildID: message.guild.id
            });
            await guildProfile.save().catch(err => console.log(err));
        }
        client.prefix = guildProfile.prefix;

        const randomAmountOfCoins = Math.floor(Math.random() * 10) + 5; //5-15 coins
        const messageGive = Math.floor(Math.random() * 10) + 1; //1-10 coins 
        if (messageGive >= 2 && messageGive <= 5) {
            let balanceProfile = await Balance.findOne({ userID: message.author.id, guildID: message.guild.id });
            if (!balanceProfile) {
                balanceProfile = await new Balance({
                    _id: mongoose.Types.ObjectId(),
                    userID: message.author.id,
                    guildID: message.guild.id,
                    lastEdited: Date.now(),
                });
                await balanceProfile.save().catch(err => console.log(err));
            }
            await Balance.findOneAndUpdate({ userID: message.author.id, guildID: message.guild.id }, { balance: balanceProfile.balance + randomAmountOfCoins, lastEdited: Date.now() });
        }

        const randomXP = Math.floor(Math.random() * 29) + 1; //1-30.
        const hasLeveledUP = await Levels.appendXp(message.author.id, message.guild.id, randomXP);
        if (hasLeveledUP) {
            const user = await Levels.fetch(message.author.id, message.guild.id);
            message.channel.send(`${message.member}, you have proceeded to level ${user.level}. Continue your work within the server.`);

            if (user.level == 10) {
                let role = message.guild.roles.cache.find(role => role.name == "Level 10");
                if (!role) await message.guild.roles.create({
                    data: {
                        name: "Level 10",
                        color: "RED",
                    }
                }).catch(err => console.log(err));
                role = message.guild.roles.cache.find(role => role.name == "Level 10");
                if (message.member.roles.cache.has(role.id)) return;
                else await message.member.roles.add(role.id);
            }

            if (user.level == 30) {
                let role = message.guild.roles.cache.find(role => role.name == "Level 30");
                if (!role) await message.guild.roles.create({
                    data: {
                        name: "Level 30",
                        color: "RED",
                    }
                }).catch(err => console.log(err));
                role = message.guild.roles.cache.find(role => role.name == "Level 30");
                if (message.member.roles.cache.has(role.id)) return;
                else await message.member.roles.add(role.id);
            }

            if (user.level == 50) {
                let role = message.guild.roles.cache.find(role => role.name == "Level 50");
                if (!role) await message.guild.roles.create({
                    data: {
                        name: "Level 50",
                        color: "RED",
                    }
                }).catch(err => console.log(err));
                role = message.guild.roles.cache.find(role => role.name == "Level 50");
                if (message.member.roles.cache.has(role.id)) return;
                else await message.member.roles.add(role.id);
            }

            if (user.level == 70) {
                let role = message.guild.roles.cache.find(role => role.name == "Level 70");
                if (!role) await message.guild.roles.create({
                    data: {
                        name: "Level 70",
                        color: "RED",
                    }
                }).catch(err => console.log(err));
                role = message.guild.roles.cache.find(role => role.name == "Level 70");
                if (message.member.roles.cache.has(role.id)) return;
                else await message.member.roles.add(role.id);
            }

            if (user.level == 90) {
                let role = message.guild.roles.cache.find(role => role.name == "Level 90");
                if (!role) await message.guild.roles.create({
                    data: {
                        name: "Level 90",
                        color: "RED",
                    }
                }).catch(err => console.log(err));
                role = message.guild.roles.cache.find(role => role.name == "Level 90");
                if (message.member.roles.cache.has(role.id)) return;
                else await message.member.roles.add(role.id);
            }

            if (user.level == 110) {
                let role = message.guild.roles.cache.find(role => role.name == "Level 110");
                if (!role) await message.guild.roles.create({
                    data: {
                        name: "Level 110",
                        color: "RED",
                    }
                }).catch(err => console.log(err));
                role = message.guild.roles.cache.find(role => role.name == "Level 110");
                if (message.member.roles.cache.has(role.id)) return;
                else await message.member.roles.add(role.id);
            }

            if (user.level == 130) {
                let role = message.guild.roles.cache.find(role => role.name == "Level 130");
                if (!role) await message.guild.roles.create({
                    data: {
                        name: "Level 130",
                        color: "RED",
                    }
                }).catch(err => console.log(err));
                role = message.guild.roles.cache.find(role => role.name == "Level 130");
                if (message.member.roles.cache.has(role.id)) return;
                else await message.member.roles.add(role.id);
            }

            if (user.level == 150) {
                let role = message.guild.roles.cache.find(role => role.name == "Level 150");
                if (!role) await message.guild.roles.create({
                    data: {
                        name: "Level 150",
                        color: "RED",
                    }
                }).catch(err => console.log(err));
                role = message.guild.roles.cache.find(role => role.name == "Level 150");
                if (message.member.roles.cache.has(role.id)) return;
                else await message.member.roles.add(role.id);
            }
        }

        if (await Afk.findOne * ({ userID: message.author.id })) {
            let afkProfile = await Afk.findOne({ userID: message.author.id });
            if (afkProfile.messageLeft == 0) {
                await Afk.findOneAndDelete({ userID: message.author.id });
                message.channel.send('You have been taken out of AFK mode');
            } else {
                await Afk.findOneAndUpdate({ userID: message.author.id }, { messageLeft: afkProfile.messageLeft - 1 });
            }
        }

        if (message.mentions.members.first()) {
            await message.mentions.members.forEach(async member => {
                let afkProfile = await Afk.findOne({ userID: message.author.id });
                if (afkProfile) message.channel.send(`${member}, is in AFK mode for: ${afkProfile.reason}`);
            })
        }

        if (!message.content.startsWith(client.prefix)) return;

        const args = message.content.slice(client.prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        if (!client.commands.has(commandName)) return;

        const command = client.commands.get(commandName);
        if (command.devOnly == true && message.author.id !== '516263567096414216') return message.channel.send('You do not have permission to use this as it is a developer command.');

        let profile = await Blacklist.findOne({
            userID: message.author.id
        });
        if (profile) return message.channel.send('You can not use commands and you are banned fom using my commands.');

        try {
            command.execute(message, args, client);
        } catch (err) {
            console.log(err);
        }
    },
};