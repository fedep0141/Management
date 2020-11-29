module.exports = {
    name: "moveall",
    description: "categoryA posA categoryB positionB: Move from A to B",
    execute(message, args, client, startslice, endslice) {
        let inCatA = args[0], inCatB = args[2];
        let inNumA = args[1] - 1, inNumB = args[3] - 1;

        const categoryDa = message.guild.channels.cache.filter(x => x.type === "voice" && x.parent.name.slice(startslice, -endslice) === inCatA);
        let channelsDa = categoryDa.map(e => client.channels.resolve(e));

        const categoryA = message.guild.channels.cache.filter(x => x.type === "voice" && x.parent.name.slice(startslice, -endslice) === inCatB);
        let channelsA = categoryA.map(e => client.channels.resolve(e));

        channelsDa[inNumA].members.forEach(member => {
            member.voice.setChannel(channelsA[inNumB]);
        });

        message.channel.send({embed: {
            color: "#c41d1d",
            description: "Moved everyone",
            fields: [{
                name: "From",
                value: channelsDa[inNumA].parent.name + " " + channelsDa[inNumA].name
              },
              {
                name: "To",
                value: channelsA[inNumB].parent.name + " " + channelsA[inNumB].name
              },
            ],
            footer: {
                text: "GulagBot by Pyguz.#0456",
                url: "https://discord.com/users/Pyguz.#0456/"
            }
          }
        });
    }
}