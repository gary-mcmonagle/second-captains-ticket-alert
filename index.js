const axios = require('axios');
const fs = require('fs');

const cheerio = require('cheerio')
const run = async () => {

    let venues = []

    const { data } = await axios.get('https://www.secondcaptains.com/live-events/');
    const $ = cheerio.load(data)
    const $liveEvents = $('div.live-events__descr.bold')
    $liveEvents.each(($l, $el) => {
        venues.push(cheerio.load($el).text());
    })
    await fs.writeFile("/email.html", venues.join('/n'), function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    }); 

}

run().then(() => console.log('done'))