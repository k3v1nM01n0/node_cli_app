
var axios = require('axios');
const API_KEY = process.env.API_KEY;
const CURRENCY = "USD";



//make a GET request to get latest coin prices
async function getRequest(date, token){

    var dict = [];
    var amount = 0;

    for(let i = 0; i < token.length; ++i){

      try{

        const res = await axios.get('https://min-api.cryptocompare.com/data/pricehistorical?fsym='+token[i]+'&tsyms='+CURRENCY+'&ts='+date.valueOf()+'&api_key='+API_KEY, { Accept: "application/json" });
        amount = res.data[token[i]][CURRENCY];
        dict.push({
          "token" : token[i],
          "data": {"date": date, "coin_value": amount, "deposit": 0, "withdrawal": 0, "difference": 0, "portfolio_value": 0}
        });

      }catch(err){
        console.error(`Token ${token[i]} is not available`);
      }
    };
    return dict;
};

module.exports = getRequest;