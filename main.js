const Discord = require("discord.js");
const DEFAULT = require("./default.json");
const DB = require("quick.db");
const FS = require("fs");
require("dotenv").config();

const client = new Discord.Client();
client.commands = new Discord.Collection();
const COMMANDFILES = FS.readdirSync("./commands/").filter(file => file.endsWith(".js"));
for(let file of COMMANDFILES) {
    let command = require("./commands/" + file);
    client.commands.set(command.name, command)
}

client.on("ready", () => {
    console.log("Management is online");
});

client.on("guildCreate", guild => {
    DB.set(guild.name, DEFAULT);
    guild.channels.create("move", {type: "text"}).then((channel) => {
        channel.send("Here you can use this bot.\nTo change the name use the $settings command");
    });
});

client.on("guildUpdate", (oldGuild, newGuild) => {
    if(newGuild.name != oldGuild.name) {
        DB.set(newGuild.name, DB.get(oldGuild.name));
        DB.delete(oldGuild.name);
    }
});

client.on("message", message => {
    const SERVER = message.guild;
    const PREFIX = DB.get(SERVER.name + ".prefix");
    const CHANNEL = DB.get(SERVER.name + ".channel");
    const STARTSLICE = DB.get(SERVER.name + ".startslice");
    const ENDSLICE = DB.get(SERVER.name + ".endslice");
    const SHORTCUTS = DB.get(SERVER.name + ".shortcuts");

    if(!message.content.startsWith(PREFIX) && !message.author.bot) {
        if(message.channel.name == CHANNEL) {
            message.delete();
            return;
        } else {
            return;
        }
    }
    if(message.author.bot) return;

    let args = message.content.slice(PREFIX.length).split(/ +/);
    const command = args.shift().toLowerCase();

    try {
        for(let i = 0; i < args.length; i++) {
            if(args[i] == "here") {
                const uHere = message.member.voice.channel;
                args[i] = uHere.parent.name.slice(STARTSLICE, -ENDSLICE);
                const categoryDa = SERVER.channels.cache.filter(x => x.type === "voice" && x.parent.name === uHere.parent.name);
                let channelsDa = categoryDa.map(e => client.channels.resolve(e));
                for(let j = 0; j < channelsDa.length; j++) {
                    if(channelsDa[j].name == uHere.name) {
                        args.splice(i + 1, 0, String(j + 1));
                    }
                }
            }
        }
    } catch (error) {
        message.channel.send("You're not in a channel");
        return;
    }

    //Global command
    if(command == "setting" || command == "settings") {
        client.commands.get("setting").execute(message, args, DB);
        return;
    }

    if(message.channel.name != CHANNEL) {
        message.channel.send("Uagliò sei sul canale sbagliato");
    } else {
        switch (command) {
            case "ping":
                client.commands.get("ping").execute(message, client);
                break;

            case "aiut":
            case "help":
                client.commands.get("help").execute(message, PREFIX, client.commands);
                break;

            case "ban":
                client.commands.get("ban").execute(message);
                break;
            
            case "pat":
                client.commands.get("pat").execute(message);
                break;

            case "scarponi":
                client.commands.get("scarponi").execute(message);
                break;

            case "moveall":
                if(args.length == 4) {
                    args = upfirst(args, SHORTCUTS);
                    if(args[0] == args[2] && args[1] == args[3]) {
                        message.channel.send("Ma ti svegli?");
                    } else {
                        try {
                            client.commands.get("moveall").execute(message, args, client, STARTSLICE, ENDSLICE);
                        } catch(error) {
                            message.channel.send("You think you can trick me?");
                        }
                    }
                } else {
                    message.channel.send(client.commands.get("moveall").description);
                }
                break;

            case "move":
                if(args.length == 3) {
                    args = upfirst(args, SHORTCUTS);
                    try {
                        client.commands.get("move").execute(message, args, client, STARTSLICE, ENDSLICE);
                    } catch(error) {
                        message.channel.send("You think you can trick me?");
                    }
                } else {
                    message.channel.send(client.commands.get("move").description);
                }
                break;
        }
    }
});

function upfirst(args, SHORTCUTS) {
    for(let i = 0; i < args.length; i++) {
        for(let key in SHORTCUTS) {
            if(args[i] == SHORTCUTS[key]) {
                args[i] = key;
            }
        }
        if(isNaN(args[i].charAt(0))) {
            args[i] = args[i].charAt(0).toUpperCase() + args[i].slice(1);
        }
    }
    return args;
}

client.login(process.env.MANAGEMENT_TOKEN);