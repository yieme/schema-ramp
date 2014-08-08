var ramp = require('../schema-ramp')
var obj        = require('./data.json')
var options    = {
  url: 'http://site.com',
  ids: true,
  absoluteIds: true,
  default: true
}
var schema     = ramp(obj, options)

var pd         = require('pretty-data').pd
console.log(pd.json(schema))
