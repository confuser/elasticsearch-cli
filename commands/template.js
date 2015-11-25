var getClient = require('../lib/get-client')
  , handleError = require('../lib/handle-error')
  , prettyPrintJson = require('../lib/pretty-print-json')
  , handleFileData = require('../lib/handle-file-data')
  , operations = { create: createTemplate, update: updateTemplate, delete: deleteTemplate }
  , allowedOperations = Object.keys(operations)

module.exports = function (cmd) {
  cmd
    .command('template <operation> [template] [file/data]')
    .alias('t')
    .description('Template operations')
    .action(function (operation, template, data) {
      var client = getClient(cmd)

      if (!template) {
        client.indices.getTemplate({ name: operation }, function (error, result) {
          if (error) return handleError(error)

          prettyPrintJson(result)
        })
      } else if (allowedOperations.indexOf(operation) !== -1) {
        operations[operation](client, template, data)
      } else {
        handleError(new Error('Invalid operation, please choose ' + allowedOperations.join(', ')))
      }
    })
}

function createTemplate(client, template, data) {
  var parsed = handleFileData(data)

  if (!parsed) return handleError(new Error('Invalid JSON format'))

  client.indices.putTemplate({ name: template, body: parsed, create: true }, function (error, result) {
    if (error) return handleError(error)

    prettyPrintJson(result)
  })
}

function updateTemplate(client, template, data) {
  var parsed = handleFileData(data)

  if (!parsed) return handleError(new Error('Invalid JSON format'))

  client.indices.deleteTemplate({ name: template }, function (error) {
    if (error) return handleError(error)

    client.indices.putTemplate({ name: template, body: parsed, create: true }, function (error, result) {
      if (error) return handleError(error)

      prettyPrintJson(result)
    })
  })
}

function deleteTemplate(client, template) {
  client.indices.deleteTemplate({ name: template }, function (error, result) {
    if (error) return handleError(error)

    prettyPrintJson(result)
  })
}
