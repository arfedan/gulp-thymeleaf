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

```js
const gulp = require('gulp');
const thymeleaf = require('gulp-thymeleaf');

gulp.task('html', function() {
  gulp.src('./src/**/*.html')
      .pipe(thymeleaf({ userName: 'Chuck Norris' }))
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
