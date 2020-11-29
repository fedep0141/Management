const cheerio = require("cheerio");
const request = require("request");

module.exports = {
    name: "scarponi",
    description: "Non te ne pentirai",
    whatDo: "You won't regret this",
    execute(message) {
        let search = "vintage boots";
    
        let options = {
            url: "http://results.dogpile.com/serp?qc=images&q=" + search,
            method: "GET",
            headers: {
                "Accept": "text/html",
                "User-Agent": "Chrome"
            }
        };

        image(message, options);
    }
}

function image(message, options) {

    request(options, function(error, response, responseBody) {
        if (error) {
            message.channel.send("Cosa è succ");
            return;
        }
    
        $ = cheerio.load(responseBody);
        
        let links = $(".image a.link");
    
        let urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href"));
        if (!urls.length) {
            return;
        }

        let index = Math.floor(Math.random() * urls.length);
    
        message.channel.send({embed: {
            color: "#593110",
            description: "Scarp",
            image: {
                url: urls[index]
            },
            footer: {
                text: "by Pyguz.#0456",
                icon_url: "https://cdn.discordapp.com/avatars/484387014725206016/4113368f74bd7056a02b20b03b2995a3.png"
              }
          }
        });
    });
}