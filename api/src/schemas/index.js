const { recursiveReadDirSync } = require('../utils')

module.exports = recursiveReadDirSync(__dirname)
  .filter((filename) => !filename.startsWith('.'))
  .filter((filename) => (filename.endsWith('-schemas.js') || filename.endsWith('-schema.js')))
  .map((schema) => require(schema))
  .reduce((schemas, schema) => Object.assign(schemas, schema), {})
