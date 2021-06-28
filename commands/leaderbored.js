const Levels = require('discord-xp');

module.exports = {
    name: 'leaderbored',
    description: 'Displays the top 5 leveld users.',
    async execute(message, args, client) {
        const rawLeaderboard = await Levels.fetchLeaderboard(message.guild.id, 5);

        if (rawLeaderboard.length < 1) return reply("Nobody's in the Leaderboard yet.");

        const Leaderboard = await Levels.computeLeaderboard(client, rawLeaderboard, true);

        const lb = Leaderboard.map(e => `${e.position}. ${e.username}#${e.discriminator}\nLevel: ${e.level}\nXP: ${e.xp.toLocaleString()}`);

        message.channel.send(`**Leaderboard**:\n\n${lb.join("\n\n")}`);
    },
};