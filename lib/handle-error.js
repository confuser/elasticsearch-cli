var prettyPrintJson = require('./pretty-print-json')

module.exports = function handleError(error) {
  prettyPrintJson(error)
  process.exit(1)
}
