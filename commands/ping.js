module.exports = {
    name: "ping",
    description: "Ping command",
    execute(message, Discord, ping) {
        const exampleEmbed = new Discord.MessageEmbed()
	    .setColor("#f0cf29")
	    .setTitle("Ping")
	    .setAuthor(client.user.username, client.user.avatarURL())
	    .setDescription(ping);

        message.channel.send(exampleEmbed);
    }
}