module.exports = {
    name: "ban",
    description: "Move everyone command",
    execute(message) {
        message.channel.send("**" + message.mentions.members.first().user.username + "** in the tomba **\n" + message.mentions.members.first().user.username + "**.bin");
    }
}