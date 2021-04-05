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
                if(key != "shortcuts") {
                    embed.addField(key, db.get(message.guild.name + "." + key), true);
                } else {
                    embed.addField(key, "list of the shortcuts", true);
                }
                
            }
            message.channel.send(embed);

        } else if(args[0] == "shortcut" || args[0] == "shortcuts") {
            if(args.length == 1) {
                let embed = new Discord.MessageEmbed()
                .setColor("#1d5791")
                .setDescription("Shortcuts")
                .setFooter("by Pyguz.#0456", "https://cdn.discordapp.com/avatars/484387014725206016/4113368f74bd7056a02b20b03b2995a3.png");
                for(let shortcut in db.get(message.guild.name + "." + args[0])) {
                    embed.addField(shortcut, db.get(message.guild.name + "." + args[0] + "." + shortcut), true);
                }
                embed.addField("\u200b", "To associate: <channel> <shortcut>, to remove: delete <channel> \nMake sure to write the name correctly (everything will be converted to lowercase)\nUse \" to write category with spaces")
                message.channel.send(embed);

            } else if(args.length == 3) {
                if(args[1] == "delete") {
                    db.delete(message.guild.name + "." + args[0] + "." + args[2]);
                    message.channel.send(args[2] + " deleted");
                } else {
                    db.set(message.guild.name + "." + args[0] + "." + args[1], args[2]);
                    message.channel.send(args[1] + " changed");
                }
            }

        } else if(args.length == 2) {
            for(let key in db.get(message.guild.name)) {
                if(args[0].toLowerCase() == key) {
                    db.set(message.guild.name + "." + key, args[1]);
                    message.channel.send("Changed in " + db.get(message.guild.name + "." + key));
                    if(key == "channel") message.channel.send("Make sure to also change the channel name");
                }
            }
        } else {
            message.channel.send("You did something wrong man");
        }
    }
}