import { getUserName } from './cli/args.js';
import readline from 'node:readline/promises';
import { exitUser } from './userManager/exitUser.js';
import { outputCurrentPath } from './userManager/outputCurrentPath.js';
import os from 'node:os';
import { commandUp } from './navi/up.js';
import { commandCd } from './navi/cd.js';
import { commandLs } from './navi/ls.js';


const userName = getUserName();
let currentPath = os.homedir();

console.log(`Welcome to the File Manager, ${userName}!`);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});


rl.on('line', async (userArguments) => {

    if (userArguments === '.exit') {
        exitUser(userName);
        rl.close();
        return;
    }
    if (userArguments === 'up') {
        currentPath = commandUp(currentPath);
        outputCurrentPath(currentPath);
        return;
    }
    if (userArguments.startsWith('cd')) {
        rl.pause();
         currentPath = await commandCd(userArguments, currentPath);
        outputCurrentPath(currentPath);
        rl.resume();
        return;
    }
    if (userArguments === 'ls') {
        rl.pause();
        const contant = await commandLs(currentPath)
        console.table(contant);
        outputCurrentPath(currentPath);
        rl.resume();
        return;
    }else {
        console.log(`Invalid input`);
        outputCurrentPath(currentPath);
    }

});



rl.on('SIGINT', async () => {
    exitUser(userName);
    rl.close();
});