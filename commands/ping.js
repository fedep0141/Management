module.exports = {
    name: "ping",
    description: "Ping command",
    execute(message, client) {

        message.channel.send({embed: {
            color: "#f0cf29",
            author: {
              name: client.user.username,
              icon_url: client.user.avatarURL()
            },
            title: "GulagBot",
            description: "Show bot ping",
            fields: [{
                name: "Ping",
                value: client.ws.ping
              }
            ]
          }
        });
    }
}