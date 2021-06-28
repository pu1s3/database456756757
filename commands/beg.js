const balance = require('../Database/models/balanceSchema');
const mongoose = require('mongoose');

module.exports = {
    name: 'beg',
    description: 'Has a chance of gicing coins to the user.',
    async execute(message, args, client) {
        const chance = Math.floor(Math.random() * 10) + 1;
        if (chance >= 1 && chance <= 3) {
            const array = [
                "Fine take all my money...",
                "Take it, this is all i have",
                "Hers is money"
            ];
            const coinsToGive = Math.floor(Math.random() * 7) + 2;
            let balanceProfile = await balance.findOne({ userID: message.author.id, guildID: message.guild.id });
            if (!balanceProfile) {
                balanceProfile = await new Balance({
                    _id: mongoose.Types.ObjectId(),
                    userID: message.author.id,
                    guildID: message.guild.id,
                    lastEdited: Date.now(),
                })
                await balanceProfile.save().catch(err => console.log(err));
            }
            message.channel.send(`${array[Math.floor(Math.random() * 2)]} | You were given $${coinsToGive}`);
            await balance.findOneAndUpdate({ userID: message.author.id, guildID: message.guild.id }, { balance: balanceProfile.balance + coinsToGive, lastEdited: Date.now() });
        } else {
            const array = [
                "NO.",
                "I do not feel like it"
            ];

            message.channel.send(array[Math.floor(Math.random())]);
        }
    },
};