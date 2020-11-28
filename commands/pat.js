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
                  }
                });
            } else {
                message.channel.send({embed: {
                    color: "#700d75",
                    description: "Pat pat",
                    fields: [{
                        name: "To",
                        value: "**" + menzione.user.username + "**"
                      },
                    ]
                  }
                });
            }
        } else {
            message.channel.send("Mention the user!!");
        }
    }
}