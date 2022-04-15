var fs = require('fs'),
    csv = require('csv-parser');

const FILE_PATH = "transactions.csv";


// parse csv file to get required data and save to a dictionary
function parser(date, dat){

    if(Object.keys(dat) < 1){
      return;
    }

    fs.createReadStream(FILE_PATH)
    .pipe(csv({delimiter: ','}))
    .on('data', function(data){
  
        try {
  
            let d = new Date(data.timestamp * 1000);
            let d1 = d.toISOString().match(/(\d{4}\-\d{2}\-\d{2})/);
            let d2 = new Date(d1[1]);
  
            if(+d2 === +date){
  
                for(let i=0; i<Object.keys(dat).length;++i){
  
                  if(data.token === dat[i]['token'] || data.transaction_type === 'DEPOSIT') {
                    try {
                      dat[i]['data']['deposit'] = Number(data.amount) + Number(dat[i]['data']['deposit']);
                      dat[i]['data']['difference'] = Number(dat[i]['data']['deposit']) - Number(dat[i]['data']['withdrawal']);
                      dat[i]['data']['portfolio_value'] = Number(dat[i]['data']['coin_value']) * Number(dat[i]['data']['difference']);
                    } catch (err) {
                      console.error(err.message);
                    }
  
                  }else if (data.token === dat[i]['token'] || data.transaction_type === 'WITHDRAWAL') {
                    try {
                      dat[i]['data']['withdrawal'] = Number(data.amount) + Number(dat[i]['data']['withdrawal']);
                      dat[i]['data']['difference'] = Number(dat[i]['data']['deposit']) - Number(dat[i]['data']['withdrawal']);
                      dat[i]['data']['portfolio_value'] = Number(dat[i]['data']['coin_value']) * Number(dat[i]['data']['difference']);
                    } catch (error) {
                      console.error(err.message);
                    }
  
                  } else {
                    break;
  
                  };
                };     
            };
        }
        catch(err) {
            console.log(err.message)
        }
    })
    .on('end',function(){
      console.log(dat);
    }); 
};



module.exports = parser;
