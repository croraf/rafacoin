const crypto = require('crypto');

const makeHash = (data) => {

    const hash = crypto.createHash('sha256');
    hash.update(data);
    return hash.digest('hex');
};

export {makeHash};

