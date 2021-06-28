const Balance = require('../Database/models/balanceSchema');
const mongoose = require('mongoose');

module.exports = {
    name: 'bal',
    description: 'Checks the balance of a member mentioned.',
    async execute(message, args, client) {
        let mentionedMember = message.member;

        let balanceProfile = await Balance.findOne({ userID: mentionedMember.id, guildID: message.guild.id });
        if (!balanceProfile) {
            balanceProfile = await new Balance({
                _id: mongoose.Types.ObjectId(),
                userID: mentionedMember.id,
                guildID: message.guild.id,
                lastEdited: Date.now(),
            });
            await balanceProfile.save().catch(err => console.log(err));
        }

        message.channel.send(`${mentionedMember} has $${balanceProfile.balance}`);
    },
};