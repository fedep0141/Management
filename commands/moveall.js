module.exports = {
    name: "moveall",
    description: "categoryA posA categoryB posB: Sposta da A a B",
    execute(message, args, client) {
        let inCatA = args[0], inCatB = args[2];
        let inNumA = args[1] - 1, inNumB = args[3] - 1;

        const categoryDa = message.guild.channels.cache.filter(x => x.type === "voice" && x.parent.name.slice(3, -3) === inCatA);
        let channelsDa = categoryDa.map(e => client.channels.resolve(e));

        const categoryA = message.guild.channels.cache.filter(x => x.type === "voice" && x.parent.name.slice(3, -3) === inCatB);
        let channelsA = categoryA.map(e => client.channels.resolve(e));

        channelsDa[inNumA].members.forEach(member => {
            member.voice.setChannel(channelsA[inNumB]);
        });

        // message.channel.send("Spostati tutti \nda  " + channelsDa[inNumA].parent.name + " " + channelsDa[inNumA].name + "\na    " + channelsA[inNumB].parent.name + " " + channelsA[inNumB].name);
        message.channel.send({embed: {
            color: "#c41d1d",
            description: "Moved all",
            fields: [{
                name: "From",
                value: channelsDa[inNumA].parent.name + " " + channelsDa[inNumA].name,
                inline: true
              },
              {
                name: "To",
                value: channelsA[inNumB].parent.name + " " + channelsA[inNumB].name,
                inline: true
              },
            ]
          }
        });
    }
}