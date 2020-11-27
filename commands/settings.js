module.exports = {
    name: "setting",
    description: "Aiuto con i comandi",
    execute(message, args, db) {
        console.log(JSON.stringify(db.get(message.guild.name)));
        // if(args.lenght == 0) {
            message.channel.send(JSON.stringify(db.get(message.guild.name)));
        // }
    }
}