module.exports = {
    name: "setting",
    description: "Aiuto con i comandi",
    execute(message, args, db) {
        if(args.lenght == 0) {
            message.channel.send(db.get(message.guild.name));
        }
    }
}