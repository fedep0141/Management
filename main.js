const Discord = require("discord.js");
// const config = require("/config.json");

const client = new Discord.Client();
const login = process.env.GULAGBOT_TOKEN;

const prefix = "$";

const fs = require("fs");
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync("./commands/").filter(file => file.endsWith(".js"));
for(const file of commandFiles) {
    const command = require("./commands/" + file);
    client.commands.set(command.name, command)
}

client.on("ready", () => {
    console.log("MoveBot is online");
});

client.on("message", message => {
    if(!message.content.startsWith(prefix) && !message.author.bot) {
        if(message.channel.name == "move") {
            message.delete();
        }else {
            return;
        }
    }

    if(message.author.bot) return;

    let args = message.content.slice(prefix.length).split(/ +/);
    const commands = args.shift().toLowerCase();

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
    

    if(message.channel.name != "move") {
        message.channel.send("Uagliò sei sul canale sbagliato");
    } else {
        if(args.length > 0) {
            for (let i = 0; i < args.length; i++) {
                switch (args[i]) {
                    case "un":
                        args[i] = "UNTOUCHABLS";
                        break;
                    case "chat":
                        args[i] = "Chatting";
                        break;
                    case "r6":
                        args[i] = "Rainbow Six Siege";
                        break;
                    case "among":
                        args[i] = "Among Us";
                        break;
                    case "fort":
                        args[i] = "Fortnite";
                        break;
                    case "brawl":
                        args[i] = "Brawl Stars";
                        break;
                    case "afk":
                        args[i] = "AWAY FROM KEYBOARD";
                        break;
                    default:
                        args[i] = args[i].charAt(0).toUpperCase() + args[i].slice(1);
                }
            }
        }
        switch (commands) {
            case "ping":
                client.commands.get("ping").execute(message, args);
                break;

            case "help" || "aiut":
                client.commands.get("help").execute(message, args, prefix);
                break;

            case "aiut":
                client.commands.get("help").execute(message, args, prefix);
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

client.login(login);