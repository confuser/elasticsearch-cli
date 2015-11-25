var fs = require('fs')

module.exports = function (data) {
  var parsed

  try {
    parsed = JSON.parse(data)
  } catch (e) {
    // Perhaps it's a file
    try {
      var stats = fs.lstatSync(data)

      if (!stats.isFile()) return null;

      // We could use require, but then opens up an injection flaw
      return JSON.parse(fs.readFileSync(data, 'utf8'));
    } catch (e) {
      return null;
    }
  }
}
