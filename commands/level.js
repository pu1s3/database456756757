const Levels = require('discord-xp');

module.exports = {
    name: 'level',
    description: 'Returns a level of the person stated',
    async execute(message, args, client) {
        let mentionMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!mentionMember) mentionMember = message.member;

        const target = await Levels.fetch(mentionMember.user.id, message.guild.id);
        if (!target) return message.channel.send('The member stated does not have any levels within the server.');

        try{
            message.channel.send(`${mentionMember} is level ${target.level} and has ${target.xp}/${Levels.xpFor(target.level + 1)}`);
        } catch (err) {
            console.log(err);
        }
    },
};