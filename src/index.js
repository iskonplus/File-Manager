import readline from 'readline/promises';
import { getUserName } from './cli/args.js';
import { userExit } from './userManager/userExit.js';
import { getHomeDir } from './os/os.js';


const userName = getUserName();
const rootDir = getHomeDir();
const currentPath = rootDir;


const rlInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});


console.log(`Welcome to the File Manager, ${userName}!`);
console.log(`You are currently in ${currentPath}`);

rlInterface.on('line', async userArg => {

    const cleanUserArg = userArg.trim().toLowerCase();

    switch (cleanUserArg) {
        case '.exit':
            userExit(userName, rlInterface);
            rlInterface.close();
            break;
        default:
            console.log(`Invalid input: ${userArg}`);
            break;
    }

    console.log('');
    console.log(`You are currently in ${currentPath}`);

})

rlInterface.on('SIGINT', async () => {
    userExit(userName, rlInterface);
});