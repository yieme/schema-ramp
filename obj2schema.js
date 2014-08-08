
/**
 * Convert Plain Old Javascript Object to JSON-Schema Object
 * @param Object
 * @param Options
 * @returns JSON-Schema Object as per json-schema.org and inspired by jsonSchema.net
 *
 * Options:
 * url          URL for id's
 * ids          include id's
 * absoluteIds  use absolute id's
 * required     set fields as required
 * verbose      add verbose details: title, description, name, minimum, minLength. A value of 'auto' will auto fill name, title & description
 * maxLength    add maxLength default for strings. A value of 'auto' will detect the maximum string length
 * maximum      add maximum default for numerics. A value of 'auto' will detect the maximum number
 */

var JsonSchemaVersion = 'http://json-schema.org/draft-04/schema#'

var ObjToSchema = function(obj, option) {
  option  = (option)     ? option     : {}
  var url = (option.url) ? option.url : ''
  var autoMaxLength = option.maxLength === 'auto'
  var autoMaximum   = option.maximum === 'auto'
  var autoMax       = autoMaxLength || autoMaximum
  var autoVerbose   = option.verbose === 'auto'

  function keyWords(key) {
    return String(key).replace(/([a-z])([A-Z0-9])/g, '$1 $2') // camel case
      .replace(/^ | $/g, '') // trim whitespace
      .toLowerCase()
  }
  function upperWords(str) {
    return keyWords(str).replace(/(^|\s)([a-z])/g, function(m,f,s) { return f+s.toUpperCase() })
  }

  function build(obj, id, idKey) {
    var required                  = []
    var schema                    = {}
    var shortId = '#' + id
    var longId  = url + id + '#'
    if (option.ids) schema.id     = (option.absoluteIds) ? longId : shortId
    schema.type                   = typeof obj
    if (option.verbose) {
      schema.name                 = (autoVerbose)             ? idKey : ''
      schema.title                = (autoVerbose || id == '') ? upperWords(idKey) : ''
      schema.description          = (autoVerbose)             ? upperWords(id.split('/').join(' ')) : ''
      schema.additionalProperties = false
    }

    switch (schema.type) {
      case 'number':
        if (obj === parseInt(obj))             schema.type    = 'integer'
        if (option.verbose || option.maximum)  schema.minimum = 0
        if (option.maximum)                    schema.maximum = (autoMaximum) ? obj : option.maximum
      break
      case 'string':
        if (option.verbose || option.maxLength) schema.minLength = 0
        if (option.maxLength)                   schema.maxLength = (autoMaxLength) ? obj.length : option.maxLength
      break
      case 'object':
        schema.type = Object.prototype.toString.call(obj).split(' ')[1].split(']')[0].toLowerCase()
      break
    }

    switch (schema.type) {
      case 'object':
        schema.properties = {}
        var key, item
        for(key in obj) {
          item = obj[ key ]
          var subId = (option.absoluteIds) ? id + '/' + key : key
          schema.properties[ key ] = build(item, subId, key)
          if (option.required) required.push(key)
        }
      break
      case 'array':
        var subId = (option.absoluteIds) ? id + '/1' : 1
        schema.items = build(obj[0], subId, 1)
      break
      case 'null':
      case 'function':
      break
      default:
        if (option.default) schema.default = obj
    }
    if ((option.required || option.verbose) && schema.type == 'object') schema.required = required
    return schema
  }

  var result = build(obj, '', 'root')
  if (option.ids) result["$schema"] = JsonSchemaVersion
  return result
}

if (module && module.exports) {
  module.exports = ObjToSchema
}
