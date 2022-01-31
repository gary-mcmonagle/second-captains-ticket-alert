const axios = require('axios');
const fs = require('fs');
const write = require('write')

const cheerio = require('cheerio')
const run = async () => {

    let venues = []

    const { data } = await axios.get('https://www.secondcaptains.com/live-events/');
    const $ = cheerio.load(data)
    const $liveEvents = $('div.live-events__descr.bold')
    $liveEvents.each(($l, $el) => {
        venues.push(cheerio.load($el).text());
    })
    write.sync('email.htm', venues.join('\n'), { newline: true }); 
}

run().then(() => console.log('done'))