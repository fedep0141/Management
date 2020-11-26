module.exports = {
    name: "pat",
    description: "@user: Dai una pacca a qualcuno",
    execute(message) {
        let menzione = message.mentions.members.first();

        if(menzione) {
            if(menzione.user.username == message.author.username) {
                message.channel.send({files: ["https://i.kym-cdn.com/entries/icons/original/000/030/329/cover1.jpg"]});
            } else {
                message.channel.send("Pat pat **" + menzione.user.username + "**");
            }
        } else {
            message.channel.send("A chi?");
        }
    }
}