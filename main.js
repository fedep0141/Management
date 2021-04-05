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

client.on("guildDelete", guild => {
    DB.delete(guild.name);
});

client.on("message", message => {
    const SERVER = message.guild;
    const PREFIX = DB.get(SERVER.name + ".prefix");
    const CHANNEL = DB.get(SERVER.name + ".channel");
    const SHORTCUTS = DB.get(SERVER.name + ".shortcuts");

    if(!message.content.startsWith(PREFIX) && !message.author.bot) {
        if(message.channel.name == CHANNEL) {
            message.delete();
            return;
        } else return;
    }
    if(message.author.bot) return;

    let args = message.content.toLowerCase().slice(PREFIX.length);
    args = args.match(/"[^"]*"|\S+/g).map(m => m.slice(0, 1) === '"'? m.slice(1, -1): m)
    const commandName = args.shift();

    try {
        for(let i = 0; i < args.length; i++) {
            if(args[i] == "here") {
                const uHere = message.member.voice.channel;
                args[i] = uHere.parent.name.toLowerCase();
                const categoryDa = SERVER.channels.cache.filter(x => x.type === "voice" && x.parent.name === uHere.parent.name);
                let channelsDa = categoryDa.map(e => client.channels.resolve(e));
                for(let j = 0; j < channelsDa.length; j++) {
                    if(channelsDa[j].name == uHere.name) {
                        args.splice(i + 1, 0, String(j + 1));
                    }
                }
            }
        }
    } catch(error) {
        message.channel.send("You're not in a channel");
        return;
    }

    //Global command
    if(commandName == "setting" || commandName == "settings") {
        client.commands.get("setting").execute(message, args, DB);
        return;
    }

    if(message.channel.name != CHANNEL) {
        message.channel.send("You are in the wrong channel, use " + SERVER.channels.cache.find(channel => channel.name === CHANNEL).toString());
    } else {
        try {
            var command = client.commands.get(commandName);
            if(commandName == "move" || commandName == "moveall") args = short(args, SHORTCUTS);
            command.execute(message, args, PREFIX, client.commands, client);
        } catch(error) {
            if(command != undefined && command.usage) {
                message.channel.send(PREFIX + commandName + " " + command.usage);
            }
        }
    }
});

function short(args, SHORTCUTS) {
    for(let i = 0; i < args.length; i++) {
        for(let key in SHORTCUTS) {
            if(args[i] == SHORTCUTS[key]) {
                args[i] = key
            }
        }
    }
    return args;
}

client.login(process.env.MANAGEMENT_TOKEN);