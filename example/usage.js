var orPromise = require('..')

// now we can use callbacks
doSomething(someCallback)
breakSomething(someCallback)

// or promises
doSomething().then(onResolve).catch(onReject)
breakSomething().then(onResolve).catch(onReject)

function doSomething (cb) {
    cb = orPromise(cb)

    setTimeout(cb, 1000)
    return cb.promise
}

function breakSomething (cb) {
    cb = orPromise(cb)

    setTimeout(cb.bind(null, new Error('boom')), 1000)
    return cb.promise
}

function someCallback (err) {
    console.log('someCallback executed' + (err ? ' with error' : ''))
}

function onResolve () {
    console.log('promise resolved')
}

function onReject () {
    console.log('promise rejected')
}
