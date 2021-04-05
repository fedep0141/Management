module.exports = {
    name: "ping",
    description: "Ping command",
    execute(message, {}, {}, {}, client) {

        message.channel.send({embed: {
            color: "#f0cf29",
            description: "Show bot ping",
            fields: [{
                name: "Ping",
                value: client.ws.ping
              }
            ],
            footer: {
                text: "by Pyguz.#0456",
                icon_url: "https://cdn.discordapp.com/avatars/484387014725206016/4113368f74bd7056a02b20b03b2995a3.png"
              }
          }
        });
    }
}