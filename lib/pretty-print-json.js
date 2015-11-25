var logger = console

module.exports = function prettyPrintJson(data) {
  if (data instanceof Error) {
    logger.info(JSON.stringify(data.message, null, 2))
  } else {
    logger.info(JSON.stringify(data, null, 2))
  }
}
