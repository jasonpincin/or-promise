'use strict'
var setImmediate = require('timers').setImmediate

module.exports = orPromise

function orPromise (cb) {
    if (cb) return cb

    var res, rej, p = new Promise(promise)
    promiseCallback.promise = p

    return promiseCallback

    function promise (_res, _rej) {
        res = _res
        rej = _rej
    }

    function promiseCallback (err, value) {
        if (err) setImmediate(rej, err)
        else setImmediate(res, value)
    }
}
