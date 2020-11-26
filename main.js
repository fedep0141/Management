const Discord = require("discord.js");
const SHORTCUTS = require("./shortcuts.json");
const FS = require("fs");

const client = new Discord.Client();
const KEYS = Object.keys(SHORTCUTS);
client.commands = new Discord.Collection();
const COMMANDFILES = FS.readdirSync("./commands/").filter(file => file.endsWith(".js"));
for(let file of COMMANDFILES) {
    let command = require("./commands/" + file);
    client.commands.set(command.name, command)
}

const LOGIN = process.env.GULAGBOT_TOKEN;

const PREFIX = "$";
const CHANNEL = "move";

client.on("ready", () => {
    console.log("GulagBot is online");
});

client.on("message", message => {
    if(!message.content.startsWith(PREFIX) && !message.author.bot) {
        if(message.channel.name == CHANNEL) {
            message.delete();
        }else {
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
                args[i] = uHere.parent.name.slice(3, -3);
                const categoryDa = message.guild.channels.cache.filter(x => x.type === "voice" && x.parent.name === uHere.parent.name);
                let channelsDa = categoryDa.map(e => client.channels.resolve(e));
                for(let j = 0; j < channelsDa.length; j++) {
                    if(channelsDa[j].name == uHere.name) {
                        args.splice(i + 1, 0, String(j + 1));
                    }
                }
            }
        }
    } catch (error) {
        message.channel.send("Non sei in nessun canale brooo");
        return;
    }

    if(message.channel.name != CHANNEL) {
        message.channel.send("Uagliò sei sul canale sbagliato");
    } else {
        if(args.length > 0) {
            for(let i = 0; i < args.length; i++) {
                for(let key in SHORTCUTS) {
                    if(args[i] == SHORTCUTS[key]) {
                        args[i] = key;
                    }
                }
                args[i] = args[i].charAt(0).toUpperCase() + args[i].slice(1);
            }
        }
        switch (command) {
            case "ping":
                client.commands.get("ping").execute(message, args);
                break;

            case "aiut":
            case "help":
                client.commands.get("help").execute(message, args, PREFIX);
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
                    if(args[0] == args[2] && args[1] == args[3]) {
                        message.channel.send("Ma ti svegli?");
                    } else {
                        try {
                            client.commands.get("moveall").execute(message, args, client);
                        } catch(error) {
                            message.channel.send("Pensi di fottermi?");
                        }
                    }
                } else {
                    message.channel.send("Wut?");
                }
                break;

            case "move":
                if(args.length == 3) {
                    try {
                        client.commands.get("move").execute(message, args, client);
                    } catch(error) {
                        message.channel.send("Pensi di fottermi?");
                    }
                } else {
                    message.channel.send("Wut?");
                }
                break;
        }
    }
});

client.login(LOGIN);