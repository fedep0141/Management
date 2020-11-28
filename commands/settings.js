module.exports = {
    name: "setting",
    description: "Aiuto con i comandi",
    execute(message, args, db) {
        let stringDb = JSON.stringify(db.all());
        console.log(stringDb);
        stringDb = stringDb.replace("{", "");
        stringDb = stringDb.replace("}", "");
        stringDb = stringDb.replace(",", "\n");
        stringDb = stringDb.replace(/['"]+/g, "");

        if(!args.lenght > 0) {
            message.channel.send(stringDb);
        } else {

        }
    }
}