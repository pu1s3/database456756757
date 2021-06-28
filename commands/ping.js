module.exports = {
    name: 'ping',
    description: 'ping!',
    execute(message, args, client) {
        message.channel.send('Pong.');
    },
};