module.exports = {
    name: "setting",
    description: "Aiuto con i comandi",
    execute(message, args, db) {
        let stringDb = JSON.stringify(db.get(message.guild.name));
        stringDb = stringDb.replace("{", "");
        stringDb = stringDb.replace("}", "");
        stringDb = stringDb.replace(",", "\n");
        stringDb = stringDb.replace(/['"]+/g, "");

        if(args.length == 0) {
            message.channel.send(stringDb);
        } else if(args.length == 1){
            for(let key in db.get(message.guild.name)) {
                if(args[0].toLowerCase() == key) {
                    message.channel.send(db.get(message.guild.name + "." + key));
                }
            }
        } else if(args.length == 3) {
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