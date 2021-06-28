const Levels = require('discord-xp');

module.exports = {
    name: 'edit',
    description: 'Edits a users level or xp.',
    async execute(message, args, client) {
        let usage = '!edit @members [xp, level] [add, set, remove] <numbers>';
        const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if (!args[0]) return message.channel.send(`You need to state more arguments \`${usage}\``);
        if (!mentionedMember) return message.channel.send('The member stated is not in the server.')
        if (!args[1]) return message.channel.send(`You must state if you are editing the members level or xp: \`${usage}\``);
        if (!['xp', 'level'].includes(args[1])) return message.channel.send('You second argument was not xp or level. ' + usage);
        if (args[1] == 'xp') {
            if (!['add', 'set', 'remove'].includes(args[2])) return message.channel.send('You have to state if you are adding, setting or removing xp from the member. ' + usage);
            const value = Number(args[3]);
            const levelUser = await Levels.fetch(mentionedMember.user.id, message.guild.id);
            if (!levelUser) return message.channel.send('That member is not registerd within the database yet.');
            if (args[2] == 'add') {
                if (!value) return message.channel.send('The number stated is not a valid number.');
                try {
                    await Levels.appendXp(mentionedMember.user.id, message.guild.id, value);
                    message.channel.send(`Added: ${value} xp to ${mentionedMember}`);
                } catch (err) {
                    console.log(err);
                }
            } else if (args[2] == 'remove') {
                if (!value) return message.channel.send('The number stated is not a valid number.');
                try {
                    await Levels.subtractXp(mentionedMember.user.id, message.guild.id, value);
                    message.channel.send(`Removed: ${value} xp from ${mentionedMember}`);
                } catch (err) {
                    console.log(err);
                }
            } else if (args[2] == 'set') {
                if (!value) return message.channel.send('The number stated is not a valid number.');
                try {
                    await Levels.setXp(mentionedMember.user.id, message.guild.id, value);
                    message.channel.send(`Set: ${value} xp to ${mentionedMember}`);
                } catch (err) {
                    console.log(err);
                }
            }
        } else if (args[1] == 'level') {
            if (!['add', 'set', 'remove'].includes(args[2])) return message.channel.send('You have to state if you are adding, setting or removing level(s) from the member. ' + usage);
            const value = Number(args[3]);
            const levelUser = await Levels.fetch(mentionedMember.user.id, message.guild.id);
            if (!levelUser) return message.channel.send('That member is not registerd within the database yet.');
            if (args[2] == 'add') {
                if (!value) return message.channel.send('The number stated is not a valid number.');
                try {
                    await Levels.appendLevel(mentionedMember.user.id, message.guild.id, value);
                    message.channel.send(`Added: ${value} level(s) to ${mentionedMember}`);
                } catch (err) {
                    console.log(err);
                }
            } else if (args[2] == 'remove') {
                if (!value) return message.channel.send('The number stated is not a valid number.');
                try {
                    await Levels.subtractLevel(mentionedMember.user.id, message.guild.id, value);
                    message.channel.send(`Removed: ${value} level(s) from ${mentionedMember}`);
                } catch (err) {
                    console.log(err);
                }
            } else if (args[2] == 'set') {
                if (!value) return message.channel.send('The number stated is not a valid number.');
                try {
                    await Levels.setLevel(mentionedMember.user.id, message.guild.id, value);
                    message.channel.send(`Set: ${value} level(s) for ${mentionedMember}`);
                } catch (err) {
                    console.log(err);
                }
            }
        }
    },
};