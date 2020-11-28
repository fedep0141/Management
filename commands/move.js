module.exports = {
    name: "move",
    description: "@user or @role categoryB positionB: Move from A to B",
    execute(message, args, client) {
        let inCatB = args[1];
        let inNumB = args[2] - 1;
        let target, a, b;
        
        const categoryA = message.guild.channels.cache.filter(x => x.type === "voice" && x.parent.name.slice(3, -3) === inCatB);
        let channelsA = categoryA.map(e => client.channels.resolve(e));

        if(message.mentions.members.first()) {
            target = message.mentions.members.first();
            a = target.voice.channel.name;
            b = target.voice.channel.parent.name;

            target.voice.setChannel(channelsA[inNumB]);

            message.channel.send({embed: {
                color: "#c41d1d",
                description: "Moved " + target.user.username,
                fields: [{
                    name: "From",
                    value: b + " " + a
                  },
                  {
                    name: "To",
                    value: channelsA[inNumB].parent.name + " " + channelsA[inNumB].name
                  },
                ]
              }
            });
        } else if(message.mentions.roles.first()) {
            target = message.mentions.roles.first();
            const team1role = message.guild.roles.cache.find((role) => role === target);

            team1role.members.forEach(member => {
                member.voice.setChannel(channelsA[inNumB]);
                a = member.voice.channel.name;
                b = member.voice.channel.parent.name;
            });

            message.channel.send({embed: {
                color: "#c41d1d",
                description: "Moved every" + target.name,
                fields: [{
                    name: "From",
                    value: b + " " + a
                  },
                  {
                    name: "To",
                    value: channelsA[inNumB].parent.name + " " + channelsA[inNumB].name
                  },
                ]
              }
            });
        }
    }
}