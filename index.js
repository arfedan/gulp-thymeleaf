/* global module */

const through     = require('through2')
const PluginError = require('plugin-error')
const thymeleaf   = require('@yadex205/thymeleaf')
const log         = require('fancy-log')

const PLUGIN_NAME = 'gulp-thymeleaf'

function gulpThymeleaf(context, options) {
  context = context || {}
  options = Object.assign({}, thymeleaf.STANDARD_CONFIGURATION, options)

  return through.obj(function(file, enc, cb) {
    if (file.isNull()) {
      return cb(null, file)
    }

    if (file.isStream()) {
      this.emit('error', new PluginError('gulp-thymeleaf', 'Streaming not supported'))
    }

    let engine = new thymeleaf.TemplateEngine(options)
    engine.process(file.contents, context)
      .then((result) => {
        file.contents = new Buffer(result)
        cb(null, file)
      })
      .catch((error) => {
        log.error(new PluginError('gulp-thymeleaf', error.toString()).toString())
        cb(null, file)
      })
  })
}

gulpThymeleaf.Thymeleaf = thymeleaf

module.exports = gulpThymeleaf
