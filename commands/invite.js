module.exports = {
    name: 'invite',
    description: 'sends a invite link',
    execute(message, args, client) {
        message.channel.send('This is my invite: `https://discord.com/api/oauth2/authorize?client_id=858359508140687360&permissions=8&scope=bot`');
    },
};