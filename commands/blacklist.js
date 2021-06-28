const Blacklist = require('../Database/models/blackListSchema');
const mongoose = require('mongoose');

module.exports = {
    name: 'blacklist',
    description: 'Bans a member from using the bot.',
    devOnly: true,
    async execute(message, args, client) {
        //!Blacklist @member reason
        const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        let reason = args.slice(1).join(" ");

        if (!args[0]) return message.channel.send('You need to provide a member to Blacklist along with why you are banning them.');
        if (!mentionedMember) return message.channel.send('The member stated is not in the server.');
        if (!reason) reason = 'No reason given.';

        let profile = await Blacklist.findOne({
            userID: mentionedMember.user.id
        });

        if (profile) return message.channel.send('This members is alredy banned from using the bot.');
        profile = await new Blacklist({
            _id: mongoose.Types.ObjectId(),
            userID: mentionedMember.user.id,
            reason: reason,
        });
        try {
            await profile.save();
            message.channel.send('Banned ' + mentionedMember + ' from using the bot ')
        } catch (err) {
            console.log(err);
        }
    },
};