# Schema Ramp

<img src="logo/schema-ramp-128.png" align="right">
Ramp up a JS object into a [JSON Schema](http://json-schema.org)

Like a moving truck ramp helps you move things onto a truck,
[schema-ramp](http://github.com/yieme/schema-ramp)
helps you move forward with using [JSON Schema](http://json-schema.org) with your data by helping convert a Plain Old JavaScript Object (POJO) into a [JSON Schema](http://json-schema.org)

## Install

#### Browser

```html
<script src="https://raw.githubusercontent.com/yieme/schema-ramp/master/schema-ramp.js" type="text/javascript"></script>
```

#### Node.js

```sh
npm install schema-ramp
```

```js
var ramp = require('schema-ramp')
```

## Usage

#### example/data.json

```js
{
  "address": {
    "streetAddress": "123 Somewhere Ave",
    "city": "Boise",
    "zip": 83702
  },
  "phoneNumber": [
    {
      "location": "home",
      "number": "800 555-1212"
    }
  ]
}
```

#### example/basic.js

Most basic example

```js
var ramp = require('../schema-ramp')
var obj        = require('./data.json')
var schema     = ramp(obj) /*
{
  "type": "object",
  "properties": {
    "address": {
      "type": "object",
      "properties": {
        "streetAddress": {
          "type": "string"
        },
        "city": {
          "type": "string"
        },
        "zip": {
          "type": "integer"
        }
      }
    },
    "phoneNumber": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "location": {
            "type": "string"
          },
          "number": {
            "type": "string"
          }
        }
      }
    }
  }
}
*/
```

#### example/ids.js

Add id's for site.com

```js
var ramp = require('../schema-ramp')
var obj        = require('./data.json')
var options    = {
  url: 'http://site.com',
  ids: true
}
var schema     = ramp(obj, options) /*
{
  "id": "#",
  "type": "object",
  "properties": {
    "address": {
      "id": "#address",
      "type": "object",
      "properties": {
        "streetAddress": {
          "id": "#streetAddress",
          "type": "string"
        },
        "city": {
          "id": "#city",
          "type": "string"
        },
        "zip": {
          "id": "#zip",
          "type": "integer"
        }
      }
    },
    "phoneNumber": {
      "id": "#phoneNumber",
      "type": "array",
      "items": {
        "id": "#1",
        "type": "object",
        "properties": {
          "location": {
            "id": "#location",
            "type": "string"
          },
          "number": {
            "id": "#number",
            "type": "string"
          }
        }
      }
    }
  },
  "$schema": "http://json-schema.org/draft-04/schema#"
} */
```

#### example/absoluteIds.js

Add absolute id's for site.com

```js
var ramp = require('../schema-ramp')
var obj        = require('./data.json')
var options    = {
  url: 'http://site.com',
  ids: true,
  absoluteIds: true
}
var schema     = ramp(obj, options) /*
{
  "id": "http://site.com#",
  "type": "object",
  "properties": {
    "address": {
      "id": "http://site.com/address#",
      "type": "object",
      "properties": {
        "streetAddress": {
          "id": "http://site.com/address/streetAddress#",
          "type": "string"
        },
        "city": {
          "id": "http://site.com/address/city#",
          "type": "string"
        },
        "zip": {
          "id": "http://site.com/address/zip#",
          "type": "integer"
        }
      }
    },
    "phoneNumber": {
      "id": "http://site.com/phoneNumber#",
      "type": "array",
      "items": {
        "id": "http://site.com/phoneNumber/1#",
        "type": "object",
        "properties": {
          "location": {
            "id": "http://site.com/phoneNumber/1/location#",
            "type": "string"
          },
          "number": {
            "id": "http://site.com/phoneNumber/1/number#",
            "type": "string"
          }
        }
      }
    }
  },
  "$schema": "http://json-schema.org/draft-04/schema#"
}
*/
```

#### example/default.js

Add defaults for site.com

```js
var ramp = require('../schema-ramp')
var obj        = require('./data.json')
var options    = {
  url: 'http://site.com',
  ids: true,
  absoluteIds: true,
  default: true
}
var schema     = ramp(obj, options) /*
{
  "id": "http://site.com#",
  "type": "object",
  "properties": {
    "address": {
      "id": "http://site.com/address#",
      "type": "object",
      "properties": {
        "streetAddress": {
          "id": "http://site.com/address/streetAddress#",
          "type": "string",
          "default": "123 Somewhere Ave"
        },
        "city": {
          "id": "http://site.com/address/city#",
          "type": "string",
          "default": "Boise"
        },
        "zip": {
          "id": "http://site.com/address/zip#",
          "type": "integer",
          "default": 83702
        }
      }
    },
    "phoneNumber": {
      "id": "http://site.com/phoneNumber#",
      "type": "array",
      "items": {
        "id": "http://site.com/phoneNumber/1#",
        "type": "object",
        "properties": {
          "location": {
            "id": "http://site.com/phoneNumber/1/location#",
            "type": "string",
            "default": "home"
          },
          "number": {
            "id": "http://site.com/phoneNumber/1/number#",
            "type": "string",
            "default": "800 555-1212"
          }
        }
      }
    }
  },
  "$schema": "http://json-schema.org/draft-04/schema#"
}*/
```

#### example/required.js

Add required fields

```js
var ramp = require('../schema-ramp')
var obj        = require('./data.json')
var options    = {
  url: 'http://site.com',
  ids: true,
  absoluteIds: true,
  default: true,
  required: true
}
var schema     = ramp(obj, options) /*
{
  "id": "http://site.com#",
  "type": "object",
  "properties": {
    "address": {
      "id": "http://site.com/address#",
      "type": "object",
      "properties": {
        "streetAddress": {
          "id": "http://site.com/address/streetAddress#",
          "type": "string",
          "default": "123 Somewhere Ave"
        },
        "city": {
          "id": "http://site.com/address/city#",
          "type": "string",
          "default": "Boise"
        },
        "zip": {
          "id": "http://site.com/address/zip#",
          "type": "integer",
          "default": 83702
        }
      },
      "required": [
        "streetAddress",
        "city",
        "zip"
      ]
    },
    "phoneNumber": {
      "id": "http://site.com/phoneNumber#",
      "type": "array",
      "items": {
        "id": "http://site.com/phoneNumber/1#",
        "type": "object",
        "properties": {
          "location": {
            "id": "http://site.com/phoneNumber/1/location#",
            "type": "string",
            "default": "home"
          },
          "number": {
            "id": "http://site.com/phoneNumber/1/number#",
            "type": "string",
            "default": "800 555-1212"
          }
        },
        "required": [
          "location",
          "number"
        ]
      }
    }
  },
  "required": [
    "address",
    "phoneNumber"
  ],
  "$schema": "http://json-schema.org/draft-04/schema#"
}*/
```

#### example/verbose.js

Add verbose fields

```js
var ramp = require('../schema-ramp')
var obj        = require('./data.json')
var options    = {
  url: 'http://site.com',
  ids: true,
  absoluteIds: true,
  default: true,
  required: true,
  verbose: true
}
var schema     = ramp(obj, options) /*
{
  "id": "http://site.com#",
  "type": "object",
  "name": "",
  "title": "root",
  "description": "",
  "additionalProperties": false,
  "properties": {
    "address": {
      "id": "http://site.com/address#",
      "type": "object",
      "name": "",
      "title": "",
      "description": "",
      "additionalProperties": false,
      "properties": {
        "streetAddress": {
          "id": "http://site.com/address/streetAddress#",
          "type": "string",
          "name": "",
          "title": "",
          "description": "",
          "additionalProperties": false,
          "minLength": 0,
          "default": "123 Somewhere Ave"
        },
        "city": {
          "id": "http://site.com/address/city#",
          "type": "string",
          "name": "",
          "title": "",
          "description": "",
          "additionalProperties": false,
          "minLength": 0,
          "default": "Boise"
        },
        "zip": {
          "id": "http://site.com/address/zip#",
          "type": "integer",
          "name": "",
          "title": "",
          "description": "",
          "additionalProperties": false,
          "minimum": 0,
          "default": 83702
        }
      },
      "required": [
        "streetAddress",
        "city",
        "zip"
      ]
    },
    "phoneNumber": {
      "id": "http://site.com/phoneNumber#",
      "type": "array",
      "name": "",
      "title": "",
      "description": "",
      "additionalProperties": false,
      "items": {
        "id": "http://site.com/phoneNumber/1#",
        "type": "object",
        "name": "",
        "title": "",
        "description": "",
        "additionalProperties": false,
        "properties": {
          "location": {
            "id": "http://site.com/phoneNumber/1/location#",
            "type": "string",
            "name": "",
            "title": "",
            "description": "",
            "additionalProperties": false,
            "minLength": 0,
            "default": "home"
          },
          "number": {
            "id": "http://site.com/phoneNumber/1/number#",
            "type": "string",
            "name": "",
            "title": "",
            "description": "",
            "additionalProperties": false,
            "minLength": 0,
            "default": "800 555-1212"
          }
        },
        "required": [
          "location",
          "number"
        ]
      }
    }
  },
  "required": [
    "address",
    "phoneNumber"
  ],
  "$schema": "http://json-schema.org/draft-04/schema#"
}*/
```

#### example/maxLength.js

Add a default max length for strings. Likewise ```maximum``` would work for numbers like ```maxLength``` does for strings

```js
var ramp = require('../schema-ramp')
var obj        = require('./data.json')
var options    = {
  url: 'http://site.com',
  ids: true,
  absoluteIds: true,
  default: true,
  required: true,
  verbose: true,
  maxLength: 99
}
var schema     = ramp(obj, options) /*
{
  "id": "http://site.com#",
  "type": "object",
  "name": "",
  "title": "root",
  "description": "",
  "additionalProperties": false,
  "properties": {
    "address": {
      "id": "http://site.com/address#",
      "type": "object",
      "name": "",
      "title": "",
      "description": "",
      "additionalProperties": false,
      "properties": {
        "streetAddress": {
          "id": "http://site.com/address/streetAddress#",
          "type": "string",
          "name": "",
          "title": "",
          "description": "",
          "additionalProperties": false,
          "minLength": 0,
          "maxLength": 99,
          "default": "123 Somewhere Ave"
        },
        "city": {
          "id": "http://site.com/address/city#",
          "type": "string",
          "name": "",
          "title": "",
          "description": "",
          "additionalProperties": false,
          "minLength": 0,
          "maxLength": 99,
          "default": "Boise"
        },
        "zip": {
          "id": "http://site.com/address/zip#",
          "type": "integer",
          "name": "",
          "title": "",
          "description": "",
          "additionalProperties": false,
          "minimum": 0,
          "default": 83702
        }
      },
      "required": [
        "streetAddress",
        "city",
        "zip"
      ]
    },
    "phoneNumber": {
      "id": "http://site.com/phoneNumber#",
      "type": "array",
      "name": "",
      "title": "",
      "description": "",
      "additionalProperties": false,
      "items": {
        "id": "http://site.com/phoneNumber/1#",
        "type": "object",
        "name": "",
        "title": "",
        "description": "",
        "additionalProperties": false,
        "properties": {
          "location": {
            "id": "http://site.com/phoneNumber/1/location#",
            "type": "string",
            "name": "",
            "title": "",
            "description": "",
            "additionalProperties": false,
            "minLength": 0,
            "maxLength": 99,
            "default": "home"
          },
          "number": {
            "id": "http://site.com/phoneNumber/1/number#",
            "type": "string",
            "name": "",
            "title": "",
            "description": "",
            "additionalProperties": false,
            "minLength": 0,
            "maxLength": 99,
            "default": "800 555-1212"
          }
        },
        "required": [
          "location",
          "number"
        ]
      }
    }
  },
  "required": [
    "address",
    "phoneNumber"
  ],
  "$schema": "http://json-schema.org/draft-04/schema#"
}*/
```

#### example/auto.js

Auto calculate values

```js
var ramp = require('../schema-ramp')
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
var schema     = ramp(obj, options) /*
{
  "id": "http://site.com#",
  "type": "object",
  "name": "root",
  "title": "Root",
  "description": "",
  "additionalProperties": false,
  "properties": {
    "address": {
      "id": "http://site.com/address#",
      "type": "object",
      "name": "address",
      "title": "Address",
      "description": "Address",
      "additionalProperties": false,
      "properties": {
        "streetAddress": {
          "id": "http://site.com/address/streetAddress#",
          "type": "string",
          "name": "streetAddress",
          "title": "Street Address",
          "description": "Address Street Address",
          "additionalProperties": false,
          "minLength": 0,
          "maxLength": 17,
          "default": "123 Somewhere Ave"
        },
        "city": {
          "id": "http://site.com/address/city#",
          "type": "string",
          "name": "city",
          "title": "City",
          "description": "Address City",
          "additionalProperties": false,
          "minLength": 0,
          "maxLength": 5,
          "default": "Boise"
        },
        "zip": {
          "id": "http://site.com/address/zip#",
          "type": "integer",
          "name": "zip",
          "title": "Zip",
          "description": "Address Zip",
          "additionalProperties": false,
          "minimum": 0,
          "maximum": 83702,
          "default": 83702
        }
      },
      "required": [
        "streetAddress",
        "city",
        "zip"
      ]
    },
    "phoneNumber": {
      "id": "http://site.com/phoneNumber#",
      "type": "array",
      "name": "phoneNumber",
      "title": "Phone Number",
      "description": "Phone Number",
      "additionalProperties": false,
      "items": {
        "id": "http://site.com/phoneNumber/1#",
        "type": "object",
        "name": 1,
        "title": "1",
        "description": "Phone Number 1",
        "additionalProperties": false,
        "properties": {
          "location": {
            "id": "http://site.com/phoneNumber/1/location#",
            "type": "string",
            "name": "location",
            "title": "Location",
            "description": "Phone Number 1 Location",
            "additionalProperties": false,
            "minLength": 0,
            "maxLength": 4,
            "default": "home"
          },
          "number": {
            "id": "http://site.com/phoneNumber/1/number#",
            "type": "string",
            "name": "number",
            "title": "Number",
            "description": "Phone Number 1 Number",
            "additionalProperties": false,
            "minLength": 0,
            "maxLength": 12,
            "default": "800 555-1212"
          }
        },
        "required": [
          "location",
          "number"
        ]
      }
    }
  },
  "required": [
    "address",
    "phoneNumber"
  ],
  "$schema": "http://json-schema.org/draft-04/schema#"
}*/
```

## License

MIT
