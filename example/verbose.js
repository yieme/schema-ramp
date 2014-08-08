var obj2schema = require('../obj2schema')
var obj        = require('./data.json')
var options    = {
  url: 'http://site.com',
  ids: true,
  absoluteIds: true,
  default: true,
  required: true,
  verbose: true
}
var schema     = obj2schema(obj, options)

var pd         = require('pretty-data').pd
console.log(pd.json(schema))