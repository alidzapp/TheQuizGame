const crypto = require('crypto');

module.exports = function(stringToHash) {
  const hash = crypto.createHash('sha256');
  hash.update(stringToHash);
  return hash.digest().toString('base64');
}