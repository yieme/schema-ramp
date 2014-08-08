var schema-ramp = require('../schema-ramp')
var obj        = require('./data.json')
var schema     = schema-ramp(obj)

var pd         = require('pretty-data').pd
console.log(pd.json(schema))
