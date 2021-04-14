const stream = require('stream');
const os = require('os');

class LineSplitStream extends stream.Transform {
  #parts
  constructor(options) {
    super(options);
    this.word = ''
  }

  _transform(chunk, encoding, callback) {
    const str = chunk.toString()

    for (const char of str ) {
      if (char === os.EOL) {
        this.push(this.word)
        this.word = ''
        continue
      }
      this.word += char
    }

    callback()
  }

  _flush(callback) {
    callback(null, this.word)
    this.word = ''
  }
}

module.exports = LineSplitStream;
