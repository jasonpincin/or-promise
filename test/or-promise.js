var test = require('tape')
var global = require('global')
var orPromise = require('..')

global.Promise = global.Promise || require('promise-polyfill')

test('returns unaltered callback if provided', function plan (t) {
    t.plan(1)

    t.equal(cb, orPromise(cb), 'cb === orPromise(cb)')
})

test('returns function with promise prop with no args', function plan (t) {
    t.plan(2)

    var p = orPromise()
    t.ok(typeof p === 'function', 'orPromise() is function')
    t.ok(p.promise, 'function.promise exists')
})

test('returns undefined if callback is given', function plan (t) {
    t.plan(1)

    t.equal(doSomething(cb), undefined, 'returns undefined')
})

test('returns promise if no callback given', function plan (t) {
    t.plan(1)

    var p = doSomething()
    t.ok(p.then, 'then exists')
})

test('promise resolves with falsey err 1st arg', function plan (t) {
    t.plan(1)

    var cb = orPromise()
    cb(null, 1)
    cb.promise.then(onResolve).catch(onReject)

    function onResolve (v) {
        t.equal(v, 1)
    }

    function onReject () {
        t.fail('should resolve')
    }
})

test('promise rejects with truthy err 1st arg', function plan (t) {
    t.plan(1)

    var cb = orPromise()
    var error = new Error('boom')
    cb(error)
    cb.promise.then(onResolve).catch(onReject)

    function onResolve (v) {
        t.fail('should reject')
    }

    function onReject (err) {
        t.equal(err, error)
    }
})

function doSomething (cb) {
    cb = orPromise(cb)
    return cb.promise
}

function cb () {}
