module.exports = {
    name: "setting",
    description: "Aiuto con i comandi",
    execute(message, args, db) {
        let json = db.get(message.guild.name);
        console.log(JSON.stringify(JSON.parse(json), null, 4));
        // if(args.lenght == 0) {
            message.channel.send(JSON.stringify(JSON.parse(json), null, 4));
        // }
    }
}