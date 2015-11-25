var getClient = require('../lib/get-client')
  , handleError = require('../lib/handle-error')
  , prettyPrintJson = require('../lib/pretty-print-json')
  , handleFileData = require('../lib/handle-file-data')
  , operations = { create: createIndex, delete: deleteIndex }
  , allowedOperations = Object.keys(operations)

module.exports = function (cmd) {
  cmd
    .command('index <operation> [name] [file/data]')
    .alias('i')
    .description('Index operations')
    .action(function (operation, index, data) {
      var client = getClient(cmd)

      if (!index) {
        client.indices.get({ index: operation }, function (error, result) {
          if (error) return handleError(error)

          prettyPrintJson(result)
        })
      } else if (allowedOperations.indexOf(operation) !== -1) {
        operations[operation](client, index, data)
      } else {
        handleError(new Error('Invalid operation, please choose ' + allowedOperations.join(', ')))
      }
    })
}

function createIndex(client, index, data) {
  var parsed

  if (data) {
    parsed = handleFileData(data)

    if (!parsed) return handleError(new Error('Invalid JSON format'))
  }

  client.indices.create({ index: index, body: parsed }, function (error, result) {
    if (error) return handleError(error)

    prettyPrintJson(result)
  })
}

function deleteIndex(client, index) {
  client.indices.delete({ index: index }, function (error, result) {
    if (error) return handleError(error)

    prettyPrintJson(result)
  })
}
