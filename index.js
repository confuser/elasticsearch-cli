#! /usr/bin/env node
var cmd = require('commander')
  , updateNotifier = require('update-notifier')
  , packageData = require('./package.json')

updateNotifier({ pkg: packageData }).notify()

cmd
  .version(packageData.version)
  .option('--host <url>', 'Host')
  .option('--log <level>', 'Set the log level')
  .option('--ar, --aws-region <region>', 'AWS Region')
  .option('--aak, --aws-access-key <key>', 'AWS Access Key')
  .option('--ask, --aws-secret-key <key>', 'AWS Secret Key')
  .option('--api', 'Elasticsearch API version')
  .option('--no-update-notifier', 'Do not check for updates for the CLI')

// Templates
require('./commands/template')(cmd)
// Indexes/indices
require('./commands/index')(cmd)

cmd.parse(process.argv)

if (!cmd.host) {
  console.error('Please specify a host')
}
