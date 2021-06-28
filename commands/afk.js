const Afk = require('../Database/models/afkSchema');
const mongoose = require('mongoose');

module.exports = {
    name: 'afk',
    description: 'Sets the user into afk mode.',
    async execute(message, args, client) {
        let reason = args.join(" ");
        if (!reason) reason = "No reason given";
        let afkProfile = await Afk.findOne({ userID: message.author.id });
        if (!afkProfile) {
            afkProfile = await new Afk({
                _id: mongoose.Types.ObjectId(),
                userID: message.author.id,
                reason: reason,
            })
            await afkProfile.save();
            message.channel.send('You have been set into AFK mode.');
        } else return message.channel.send('You are already AFK');
    },
};