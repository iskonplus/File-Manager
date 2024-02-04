import { getUserName } from './cli/args.js';
import readline from 'readline/promises'
import { exitUser } from './userManager/exitUser.js';

const userName = getUserName();

console.log(`Welcome to the File Manager, ${userName}!`);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})


rl.on('line', async (userArguments) => {

    if (userArguments === '.exit') {
        exitUser(userName);
        rl.close();
        return;
    }
});



rl.on('SIGINT', async () => {
    exitUser(userName);
    rl.close();
})