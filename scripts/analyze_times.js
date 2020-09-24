const fs = require('fs')

const LOGS_PATH = process.argv[2]

fs.readFile(LOGS_PATH, (err, contents) => {
    if (err) throw err;
    console.log(contents)
})
