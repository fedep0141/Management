module.exports = {
    name: "setting",
    description: "Aiuto con i comandi",
    execute(message, args, db) {
        let stringDb = JSON.stringify(db.get(message.guild.name));
        stringDb = stringDb.replace("{", "");
        stringDb = stringDb.replace("}", "");
        stringDb = stringDb.replace(",", "\n");
        stringDb = stringDb.replace("\"", "");
        console.log(stringDb);
        // if(args.lenght == 0) {

            message.channel.send(stringDb);
        // }
    }
}