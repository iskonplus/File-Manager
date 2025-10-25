import readline from 'readline/promises';
import { getUserName } from './cli/args.js';
import { userExit } from './userManager/userExit.js';
import { getHomeDir } from './os/os.js';
import { upDir } from './nav/upDir.js';
import { changeDirectory } from './nav/cdDir.js';
import { list } from './fs/list.js';


const userName = getUserName();
const rootDir = getHomeDir();
let currentPath = rootDir;


const rlInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});


console.log(' ');
console.log(`Welcome to the File Manager, ${userName}!`);
console.log(`You are currently in ${currentPath}`);
console.log(' ');

rlInterface.on('line', async args => {

    const cleanUserArgs = args.split(' ').filter(arg => arg !== '');
    const userArg = cleanUserArgs.filter((_, ind) => ind !== 0).join(' ');
    console.log('====>',userArg);

    switch (cleanUserArgs.join(' ')) {
        case '.exit':
            userExit(userName, rlInterface);
            rlInterface.close();
            break;
        case 'up':
            currentPath = upDir(rootDir, currentPath);
            break;
        case `cd ${userArg}`:
            currentPath = await changeDirectory(currentPath, userArg);
            break;
        case 'ls':
            await list(currentPath);
            break;

        default:
            console.log('');
            console.log(`Invalid input: ${args}`);
            break;
    }

    console.log(`You are currently in ${currentPath}`);
    console.log('');

})

rlInterface.on('SIGINT', async () => {
    userExit(userName, rlInterface);
});