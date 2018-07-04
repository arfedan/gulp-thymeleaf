/* global module */

const through     = require('through2')
const PluginError = require('plugin-error')
const thymeleaf   = require('thymeleaf')

const PLUGIN_NAME = 'gulp-thymeleaf'

function gulpThymeleaf(context, options) {
  context = context || {}
  options = options || thymeleaf.STANDARD_CONFIGURATION

  return through.obj((file, enc, cb) => {
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
      })
      .catch((error) => {
        this.emit('error', new PluginError('gulp-thymeleaf', error.toString()))
      })

    cb(null, file)
  })
}

gulpThymeleaf.Thymeleaf = thymeleaf

module.exports = gulpThymeleaf
