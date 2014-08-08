var ramp = require('../schema-ramp')
var obj        = require('./data.json')
var schema     = ramp(obj)

var pd         = require('pretty-data').pd
console.log(pd.json(schema))
