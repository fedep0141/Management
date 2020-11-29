const cheerio = require("cheerio");
const request = require("request");

module.exports = {
    name: "scarponi",
    description: "Non te ne pentirai",
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
          }
        });
    });
}