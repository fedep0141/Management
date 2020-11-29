module.exports = {
    name: "ping",
    description: "Ping command",
    execute(message, client) {

        message.channel.send({embed: {
            color: "#f0cf29",
            description: "Show bot ping",
            fields: [{
                name: "Ping",
                value: client.ws.ping
              }
            ],
            footer: {
                text: "GulagBot by Pyguz.#0456",
                url: "https://discord.com/users/Pyguz.#0456/"
              }
          }
        });
    }
}