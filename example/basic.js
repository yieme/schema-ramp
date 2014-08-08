var obj2schema = require('../obj2schema')
var obj        = require('./data.json')
var schema     = obj2schema(obj)

var pd         = require('pretty-data').pd
console.log(pd.json(schema))
