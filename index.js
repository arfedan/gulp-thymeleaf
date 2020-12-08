/* global module */

const through     = require('through2')
const PluginError = require('plugin-error')
const thymeleaf   = require('thymeleaf')
const log         = require('fancy-log')

const PLUGIN_NAME = 'gulp-thymeleaf'

const getNamespaceFromFile = file => {
  const [,dirname] = file.path.split(file.base).pop().split('/');

  return dirname;
};

function gulpThymeleaf(namespacedContext, messages, customOptions) {
  return through.obj(function(file, enc, cb) {
    const defaultOptions = {
      dialects: [
        new thymeleaf.StandardDialect('th')
      ],
      messageResolver: (key, parameters) => {
        const pairs = (parameters || []).map((param, i) => [i, param]);

        let text = messages[key];

        pairs.forEach(([i, value]) => {
          text = text.replace(`{${i}}`, value);
        });

        return text;
      }
    };

    const namespace = getNamespaceFromFile(file);

    const context = (namespacedContext[namespace]) || {};
    const options = { ...thymeleaf.STANDARD_CONFIGURATION, ...defaultOptions, ...customOptions };

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
