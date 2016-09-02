# or-promise

[![NPM version](https://badge.fury.io/js/afterward.png)](http://badge.fury.io/js/afterward)
[![Build Status](https://travis-ci.org/jasonpincin/afterward.svg?branch=master)](https://travis-ci.org/jasonpincin/afterward)
[![Coverage Status](https://coveralls.io/repos/jasonpincin/afterward/badge.png?branch=master)](https://coveralls.io/r/jasonpincin/afterward?branch=master)

Accept a callback OR return a promise (easily).

## example

```javascript
const orPromise = require('or-promise')

function greetSoon (cb) {
    cb = orPromise(cb)
    setImediate(cb, null, 'hello')
    return cb.promise
}

// we can now use our fancy function either way...
greetSoon(function (err, msg) {
    if (err) return console.error(err)
    console.log(msg)
})

// or a promise
greetSoon().then(console.log).catch(console.error)
```

## example with default parameters

Same function as above, but using default parameters (if your JS engine supports
it):

```javascript
const orPromise = require('or-promise')

function greetSoon (cb = orPromise()) {
    setImediate(cb, null, 'hello')
    return cb.promise
}
```

## api

```javascript
var orPromise = require('or-promise')
```

### cb = orPromise([cb])

When called with a (truthy) `cb` argument, `orPromise` simply returns the 
argument it was called with, unaltered. 

If called with no argument, a function will be returned that is usable as an 
error-first callback. This function will have a `promise` property. When the
returned callback is invoked, the `promise` property will be:

* resolved if the callback was invoked with a falsy first argument
* rejected if the callback was invoked with a truthy first argument

If resolved, the resolved value will be the 2nd argument supplied to the
callback. If rejected, the error will be the 1st argument supplied to the
callback.

## testing

`npm test`

### browser test

`npm run browser-test`

This will run the tests in all browsers (specified in .zuul.yml). Be sure to 
[educate zuul](https://github.com/defunctzombie/zuul/wiki/cloud-testing#2-educate-zuul) 
first.

### coverage

`npm run open-cover`

Open coverage in browser.