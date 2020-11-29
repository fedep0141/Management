module.exports = {
    name: "help",
    description: "Aiuto con i comandi",
    execute(message, args, prefix) {
        message.channel.send({embed: {
            color: "#28b013",
            description: "Command list",
            fields: [{
                name: "help",
                value: "Show command list",
                inline: true
              },
              {
                name: "moveall",
                value: "categoryA posA categoryB positionB: Move from A to B",
                inline: true
              },
              {
                name: "move",
                value: "@user or @role categoryB positionB: Move from A to B",
                inline: true
              },
              {
                name: "scarponi",
                value: "Non te ne pentirai",
                inline: true
              },
              {
                name: "pat",
                value: "@user: pat someone",
                inline: true
              },
              {
                name: "settings",
                value: "Change settings",
                inline: true
              },
            ],
            footer: {
                text: "You can use here to have your category and position\nGulagBot by Pyguz.#0456"
              }
          }
        });
    }
}