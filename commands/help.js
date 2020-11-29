const Discord = require("discord.js");

module.exports = {
    name: "help",
    description: "Aiuto con i comandi",
    whatDo: "Help with commands",
    execute(message, args, prefix, commands) {
      
      let embed = new Discord.MessageEmbed()
      .setColor("#28b013")
      .setDescription("Command list")
      .setFooter("by Pyguz.#0456", "https://cdn.discordapp.com/avatars/484387014725206016/4113368f74bd7056a02b20b03b2995a3.png");
      Array.from(commands.keys()).forEach(key => {
        embed.addField(key, commands.get(key).whatDo, true);
      });
        
      

      message.channel.send(embed);
    }
}