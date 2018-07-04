gulp-thymeleaf
==============

Thymeleaf plugin for gulp


Install
-------

```bash
$ npm install --save-dev gulp-thymeleaf
```


Example
-------

Give only context for template

```js
const gulp = require('gulp');
const thymeleaf = require('gulp-thymeleaf');

gulp.task('html', function() {
  gulp.src('./src/**/*.html')
      .pipe(thymeleaf({ userName: 'Chuck Norris' }))
      .pipe(gulp.dest('./build'))
})
```

Give context and options for template

```js
const gulp = require('gulp');
const thymeleaf = require('gulp-thymeleaf');

gulp.task('html', function() {
  gulp.src('./src/**/*.html')
      .pipe(thymeleaf({ userName: 'Chuck Norris' }, { isomorphic: { prefix: 'th' } }))
      .pipe(gulp.dest('./build'))
})
```

Give only options for template

```js
const gulp = require('gulp');
const thymeleaf = require('gulp-thymeleaf');

gulp.task('html', function() {
  gulp.src('./src/**/*.html')
      .pipe(thymeleaf({}, { isomorphic: { prefix: 'th' } }))
      .pipe(gulp.dest('./build'))
})
```


API
---

### thymeleaf(context, options)

#### context

Type: `Hash` Default: `{}`


#### options

Type: `Hash` Default: `thymeleaf.Thymeleaf.STANDARD_CONFIGURATION`

Given `options` will override `STANDARD_CONFIGURATION`.

See [available options](https://www.npmjs.com/package/thymeleaf#new-templateengineoptions)
on ThymeleafJS document.
