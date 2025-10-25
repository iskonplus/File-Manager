import readline from 'readline/promises';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.on('line', async userArg => {

    switch (userArg) {
        case ' ':
            console.log('test');
            break;
        default:
            console.log(`Invalid input: ${userArg}`);
            break;
    }

})

rl.on('SIGINT', async () => {
    rl.close();
});