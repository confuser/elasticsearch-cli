var ElasticSearch = require('elasticsearch')

module.exports = function getClient(cmd) {
  var config = { log: cmd.log || 'warning', host: cmd.host }

  if (cmd.api) config.apiVersion = cmd.api

  if (cmd.awsAccessKey) {
    config.connectionClass = require('http-aws-es')
    config.amazonES =
      { region: cmd.awsRegion
      , accessKey: cmd.awsAccessKey
      , secretKey: cmd.awsSecretKey
      }
  }

  return new ElasticSearch.Client(config)
}
