const crypto = require('crypto');
const path = require('path');
const fs = require('fs');

const data = [
    { username: 'Jen', email: 'jenbird@bol.com.br', password: '12345', id: '', type: 'admin', salt: '' },
    { username: 'Tommy', email: 'tommyshelby@bol.com.br', password: '1234567', id: '', type: 'volunteer', salt: '' },
    { username: 'Stuart', email: 'stuart@yahoo.com.br', password: '1234589', id: '', type: 'refugee', salt: '' },
    { username: 'Smith', email: 'smith@bol.com.br', password: '1234510', id: '',  type: 'manager', salt: '' },
];

function hashPasword(user) {
    var salt = crypto.randomBytes(16).toString('hex');
    const hashedPassword = crypto.pbkdf2Sync(user.password, salt, 310000, 32, 'sha256');

    return {
        ...user,
        password: hashedPassword.toString('hex'),
        salt,
        id: crypto.randomBytes(10).toString('hex')
    }
}

const newData = data.map(user => {
    return hashPasword(user);
});

function writeFakeDB(userData) {
    const moduleExportString = 'module.exports = ';
    
    fs.writeFile(path.join(__dirname, 'fakeDB.js'), moduleExportString + JSON.stringify(userData), 'utf-8', () => {
        console.log('file written')
    });
}

function writeNewUser(db, newUser) {
    const newUserHashedPassword = hashPasword(newUser);
    const newUserData = [...db, newUserHashedPassword];

    writeFakeDB(newUserData);
}

module.exports = { writeNewUser };