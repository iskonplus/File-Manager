import readline from 'readline/promises';
import { getUserName } from './cli/args.js';
import { userExit } from './userManager/userExit.js';


const userName = getUserName();

const rlInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});


console.log(`Welcome to the File Manager, ${userName}!`);

rlInterface.on('line', async userArg => {

    switch (userArg) {
        case '.exit':
            userExit(userName, rlInterface);
            rlInterface.close();
            break;
        default:
            console.log(`Invalid input: ${userArg}`);
            break;
    }

})

rlInterface.on('SIGINT', async () => {
    userExit(userName, rlInterface);
});