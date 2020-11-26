module.exports = {
    name: "help",
    description: "Aiuto con i comandi",
    execute(message, args, prefix) {
        let messaggio = `
${prefix}help: Aiuto con i comandi
${prefix}moveall categoryA posA categoryB posB: Sposta da A a B
${prefix}move @user o @role categoryB posB: Sposta da A a B
${prefix}scarponi: Non te ne pentirai
${prefix}pat @user: Dai una pacca a qualcuno
Note: puoi usare here per la tua categoria e posizione`;
        message.channel.send(messaggio);
    }
}