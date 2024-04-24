const fs = require('fs');
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function validatePassword(password) {
    // Minimum eight characters, at least one letter, one number and one special character
    const re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return re.test(password);
}

function saveCredentials(email, password) {
    const credentials = { email, password };
    fs.writeFileSync('credentials.json', JSON.stringify(credentials, null, 2));
}

rl.question('Enter your email address: ', (email) => {
    if (!validateEmail(email)) {
        console.log('Invalid email format');
        rl.close();
        return;
    }

    rl.question('Enter your password: ', (password) => {
        if (!validatePassword(password)) {
            console.log('Password does not meet the criteria');
            rl.close();
            return;
        }

        saveCredentials(email, password);
        console.log('You have successfully signed up!');
        rl.close();
    });
});
