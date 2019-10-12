var Crawler = require("crawler");
const cheerio = require('cheerio');
 
var c = new Crawler({
    maxConnections : 10,
    // This will be called for each crawled page
    callback : function (error, res, done) {
        if(error){
            console.log(error);
        }else{
            var $ = res.$;
            // $ is Cheerio by default
            //a lean implementation of core jQuery designed specifically for the server
            console.log($("div").text());
        }
        done();
    }
});
// Queue URLs with custom callbacks & parameters
c.queue([{
    uri: 'https://br.financas.yahoo.com/quote/PETR4.SA',
    jQuery: false,
 
    // The global callback won't be called
    callback: function (error, res, done) {
        if(error){
            console.log(error);
        }else{
            console.log('Grabbed', res.body.length, 'bytes');
            //console.log($("div").text());
            //console.log(res.body);
            let $ = cheerio.load(res.body);  //loading of complete HTML body
            $('div.data-reactid=35').each(function(index){
                const link = $(this).find('a').attr('href');            
            });
        }
        done();
    }
}]);

