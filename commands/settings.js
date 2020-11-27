module.exports = {
    name: "setting",
    description: "Aiuto con i comandi",
    execute(message, args, db) {
        let json = JSON.stringify(db.get(message.guild.name));
        console.log(JSON.parse(json));
        // if(args.lenght == 0) {
            message.channel.send(JSON.parse(json));
        // }
    }
}