module.exports = {
    name: 'ping',
    description: 'ping!',
    execute(message, args, client) {
        message.channel.send(`My ping is **${client.ws.ping}ms** !`);
    },
};