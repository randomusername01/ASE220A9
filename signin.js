const fs = require('fs');
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function checkCredentials(email, password) {
    try {
        const data = fs.readFileSync('credentials.json', 'utf8');
        const credentials = JSON.parse(data);
        return credentials.email === email && credentials.password === password;
    } catch (err) {
        console.error('Error reading from credentials file:', err);
        return false;
    }
}

rl.question('Enter your email address: ', (email) => {
    rl.question('Enter your password: ', (password) => {
        if (checkCredentials(email, password)) {
            console.log('Successfully logged in!');
        } else {
            console.log('Invalid email or password!');
        }
        rl.close();
    });
});
