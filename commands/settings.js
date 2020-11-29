const Discord = require("discord.js");

module.exports = {
    name: "setting",
    description: "Change settings",
    execute(message, args, db) {
        let stringDb = JSON.stringify(db.get(message.guild.name));
        stringDb = stringDb.replace("{", "");
        stringDb = stringDb.replace("}", "");
        // stringDb = stringDb.replace(",", "\n");
        stringDb = stringDb.replace(/['"]+/g, "");
        let res = stringDb.split(/[:,]+/g);

        if(args.length == 0) {
            let embed = new Discord.MessageEmbed()
            .setColor("#700d75")
            .setDescription("Settings");
            for(let key in db.get(message.guild.name)) {
                embed.addField(key, db.get(message.guild.name + "." + key), true);
            }
        } else if(args.length == 1){
            for(let key in db.get(message.guild.name)) {
                if(args[0].toLowerCase() == key) {
                    message.channel.send(db.get(message.guild.name + "." + key));
                }
            }
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