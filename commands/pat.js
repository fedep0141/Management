module.exports = {
    name: "pat",
    description: "@user: pat someone",
    execute(message) {
        let menzione = message.mentions.members.first();

        if(menzione) {
            if(menzione.user.username == message.author.username) {
                message.channel.send({embed: {
                    color: "#700d75",
                    description: "Damn",
                    image: {
                        url: "https://i.kym-cdn.com/entries/icons/original/000/030/329/cover1.jpg"
                    },
                    footer: {
                        text: "GulagBot by Pyguz.#0456",
                        url: "https://discord.com/users/Pyguz.#0456/"
                    }
                  }
                });
            } else {
                message.channel.send({embed: {
                    color: "#700d75",
                    description: "Pat pat",
                    fields: [{
                        name: menzione.user.username
                      },
                    ],
                    footer: {
                        text: "GulagBot by Pyguz.#0456",
                        url: "https://discord.com/users/Pyguz.#0456/"
                    }
                  }
                });
            }
        } else {
            message.channel.send("Mention the user!!");
        }
    }
}