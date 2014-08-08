var schema-ramp = require('../schema-ramp')
var obj        = require('./data.json')
var options    = {
  url: 'http://site.com',
  ids: true,
  absoluteIds: true,
  default: true,
  required: true,
  verbose: true,
  maxLength: 'auto',
  maximum: 'auto',
  verbose: 'auto'
}
var schema     = schema-ramp(obj, options)

var pd         = require('pretty-data').pd
console.log(pd.json(schema))
