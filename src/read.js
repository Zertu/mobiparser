const fs = require('fs')
module.exports = read = (file) => (new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
        if (err) {
            reject(err)
        } else {
            resolve(data)
        }
    })
}))