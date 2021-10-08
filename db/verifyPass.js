const fakeDB = require('./fakeDB');
const crypto = require('crypto');

function verifyPass(username, password) {
    const dbUser = fakeDB.find(fakeDBUser => fakeDBUser.username === username);
    const passwordInHashed = crypto.pbkdf2Sync(password, dbUser.salt, 310000, 32, 'sha256');

    if (!crypto.timingSafeEqual(Buffer.from(dbUser.password, 'hex'), passwordInHashed)) {
        console.log('do not match')
        return false;
    }
    console.log('match')
    return true;
}

module.exports = verifyPass;

// verifyPass('Jen', '12345')