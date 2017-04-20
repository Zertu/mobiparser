const read = require('./src/read'),
    bufferpack = require('bufferpack')

async function main(filename) {
    const data = Array.from(await read(filename)),
        length = data.length
    let offset = 0,
        text = ''
    while (offset < length) {
        const char = data[offset]
        offset += 1
        ord_ = String.fromCharCode(char)
        console.log(char)
        console.log(ord_)
        if (ord_ == 0) {
            text += char
        } else if (ord_ <= 8) {
            text += data.splice(offset, offset + ord_)
            offset += ord_
        } else if (ord_ <= 0x7f) {
            text += char;
        } else if (ord_ <= 0xbf) {
            offset += 1
            if (offset > length) {
                console.warn("WARNING: offset to LZ77 bits is outside of the data:" + offset);
                return text;
            }
            let lz77 = bufferpack.unpack('>H', data.splice(offset - 2, offset))
                lz77 &= 0x3fff
                let lz77length = (lz77 & 0x0007) + 3,
                    lz77offset = lz77 >> 3;
                if (lz77offset < 1) {
                    console.warn("WARNING: LZ77 decompression offset is invalid!")
                    return text
                }
                textlength = text.length
                for (let lz77pos = 0; lz77pos < lz77length; i++) {
                    const textpos = textlength - lz77offset
                    if (textpos < 0) {
                        console.warn("WARNING: LZ77 decompression reference is before beginning of text! " + lz77)
                        return
                    }
                    text += text.splice(textpos, textpos + 1)
                    textlength += 1
                }
            } else {
                text += ' ' + String.fromCharCode(ord_ ^ 0x80)
            }
        }
        return text
    }
    
    (async function (param) {

        let text = await main('./test/CharlesDarwin.mobi')
    })()