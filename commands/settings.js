const Discord = require("discord.js");

module.exports = {
    name: "setting",
    description: "Change settings",
    execute(message, args, db) {
        if(args.length == 0) {
            let embed = new Discord.MessageEmbed()
            .setColor("#1d5791")
            .setDescription("Settings")
            .setFooter("by Pyguz.#0456", "https://cdn.discordapp.com/avatars/484387014725206016/4113368f74bd7056a02b20b03b2995a3.png");
            for(let key in db.get(message.guild.name)) {
                embed.addField(key, db.get(message.guild.name + "." + key), true);
            }

            message.channel.send(embed);
        } else if(args.length == 2) {
            for(let key in db.get(message.guild.name)) {
                if(args[0].toLowerCase() == key) {
                    db.set(message.guild.name + "." + key, args[1]);
                    message.channel.send("Changed in " + db.get(message.guild.name + "." + key));
                }
            }
        } else {
            message.channel.send("Wut?");
        }
    }
}