#!/usr/bin/env node

var argv = require('minimist')(process.argv.slice(2)),
    parser = require('../lib/parser'),
    getRecentDate = require('../lib/date'),
    getRequest = require('../lib/net');
require('dotenv').config()


const TOKENS = ['BTC', 'ETR', 'TRP']

// set date and token provided from command line
var date;
var token = new Array();

date = argv['d'];
token.push(argv['t']) 

//if not provided set all tokens
token = token[0] ? token : TOKENS

// if not provided set current date and call main function
if(date){
  date = new Date(date);
  app(date, token);
}else{
  getRecentDate().then(data =>{
    app(data, token);
  });
};


function app(date, token){
  getRequest(date, token).then(data => {
  parser(date, data);
}).catch(err => console.error(err))
}





