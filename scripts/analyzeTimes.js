const fs = require('fs')

const LOGS_PATH = process.argv[2]

fs.readFile(LOGS_PATH, 'utf8', (err, contents) => {
    if (err) throw err;
    const objects = contents.split('\n')
        .filter(v => {
            try {
                JSON.parse(v)
                return true
            } catch (e) {
                return false
            }
        })
        .map(JSON.parse)
        .filter(v => typeof v == 'object' && v.metric && v.time)

    const textCredibilities = objects
        .filter(v => v.metric === 'TEXT_CREDIBILITY')
        .map(v => v.time)
    console.log(textCredibilities)
    console.log({
        avg: avg(textCredibilities),
        min: min(textCredibilities),
        max: max(textCredibilities)
    })
})

function sum(v) {
    return v.reduce((prev, curr) => prev + curr, 0)
}

function avg(v) {
    return sum(v) / v.length
}

function min(v) {
    return v.reduce((prev, curr) => prev < curr ? prev : curr, v[0])
}

function max(v) {
    return v.reduce((prev, curr) => prev < curr ? curr : prev, v[0])
}
