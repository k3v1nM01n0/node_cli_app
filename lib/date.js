var fs = require('fs'),
    readline = require('readline');


async function getRecentDate() {
    var num = 2,i = 0, d;
    var rd = readline.createInterface({
    input: fs.createReadStream('transactions.csv'),
    console: false
    });
    for await(const line of rd){
      if(i == num){
        d = line;
        rd.close();
      }
      i++;
    }
    d = d.split(',');
    let d1 = new Date(d[0] * 1000);
    let d2 = d1.toISOString().match(/(\d{4}\-\d{2}\-\d{2})/);
    let d3 = new Date(d2[1]);
  
    return d3;
        
  }

  module.exports = getRecentDate;