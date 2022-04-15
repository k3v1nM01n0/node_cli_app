
# CLI App

This is the solution to propine engineering interview, question 1. It's a command line application for parsing crypto transactions saved in a [csv file](https://s3-ap-southeast-1.amazonaws.com/static.propine.com/transactions.csv.zip).


# Usage
### Running with no arguments

Running without any arguments brings you the latest portfolio value per token in USD

``` sh
node bin/index.js
```
You should see the results returned in JSON format

### Running with options

You can change the result type to a specific date by passing in the __d__ option followed by the date in yyyy/mm/dd format.

``` sh
node bin/index.js -d 2019-06-10
```

Passing option __t__ followed by the token gives you the latest portfolio value for that token.

``` sh
node bin/index.js -t BTC
```

You could also combine options __d__ and __t__ to get the portfolio value of the token on the specified date.

``` sh
node bin/index.js -d 2019-06-10 -t BTC
```

