const stream = require('stream');
const LimitExceededError = require('./LimitExceededError');

class LimitSizeStream extends stream.Transform {
  #limit
  #readed
  constructor(options) {
    super(options);
    this.limit = options.limit
    this.readed = 0
  }

  _transform(chunk, encoding, callback) {
    if (this.limit >= this.readed + chunk.byteLength) {
      callback(null, chunk)
      this.readed += chunk.byteLength
    } else {
      callback(new LimitExceededError, null)
    } 
  }
}

module.exports = LimitSizeStream;
