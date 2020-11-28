module.exports = {
    name: "setting",
    description: "Aiuto con i comandi",
    execute(message, args, db) {
        let stringDb = JSON.stringify(db.get(message.guild.name));
        stringDb = stringDb.replace("{", "");
        stringDb = stringDb.replace("}", "");
        stringDb = stringDb.replace(",", "\n");
        stringDb = stringDb.replace(/['"]+/g, "");

        if(!args.length > 0) {
            message.channel.send(stringDb);
        } else {
            console.log(args[0]);
            for(let key in db.get(message.guild.name)) {
                console.log(key);
                if(args[0] == key) {
                    message.channel.send(db.get(message.guild.name + "." + key));
                }
            }
        }
    }
}