const read = require('./src/read')

async function main(filename) {
    const data = await read(filename),
        length = data.length
    let offset = 0,
        text = ''
    while (offset < length) {
        char = data[offset]
        offset += 1
        ord_ = String.fromCharCode(char)
        if (ord_ == 0) {
            text += char
        }
    }
    console.log(data.length)
}

main('./test/CharlesDarwin.mobi')