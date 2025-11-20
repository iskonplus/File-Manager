import readline from 'readline/promises';
import { getUserName } from './cli/args.js';
import { userExit, printGreetings, printCurrentPath } from './userManager/userExit.js';
import { getHomeDir, getEOL, cpuInfo, systemUserName, systemArchitecture } from './os/os.js';
import { add, mkdir, cp, rm, ls, mv, cat, rn } from './fs/barrelFs.js';
import { cd, up } from './nav/barrelNav.js';
import { calcHash } from './hash/calcHash.js';
import { compress, decompress } from './compression/barrelZip.js';
import { invalidArgsLog } from './utils/utils.js';


const userName = getUserName();
const rootDir = getHomeDir();
let currentPath = rootDir;

printGreetings(userName, currentPath);

const rlInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});


rlInterface.on('line', async args => {

    const cleanUserArgs = args.split(' ').filter(arg => arg !== '');
    const userArg = cleanUserArgs.filter((_, ind) => ind !== 0).join(' ');

    switch (cleanUserArgs.join(' ')) {
        case '.exit':
            userExit(userName, rlInterface);
            rlInterface.close();
            break;
        case 'up':
            currentPath = up(rootDir, currentPath);
            break;
        case `cd ${userArg}`:
            currentPath = await cd(currentPath, userArg);
            break;
        case 'ls':
            await ls(currentPath);
            break;
        case `cat ${userArg}`:
            await cat(currentPath, userArg);
            break;
        case `add ${userArg}`:
            await add(currentPath, userArg);
            break;
        case `mkdir ${userArg}`:
            await mkdir(currentPath, userArg);
            break;
        case `rn ${userArg}`:
            await rn(currentPath, ...userArg.split(' '));
            break;
        case `cp ${userArg}`:
            await cp(currentPath, ...userArg.split(' '));
            break;
        case `mv ${userArg}`:
            await mv(currentPath, ...userArg.split(' '));
            break;
        case `rm ${userArg}`:
            console.log(' ');
            await rm(currentPath, ...userArg.split(' '));
            break;
        case 'os --EOL':
            await getEOL();
            break;
        case 'os --cpus':
            await cpuInfo();
            break;
        case 'os --homedir':
            console.log(' ');
            console.log(`Home directory: ${getHomeDir()}`);
            break;
        case 'os --username':
            await systemUserName();
            break;
        case 'os --architecture':
            await systemArchitecture();
            break;
        case `hash ${userArg}`:
            await calcHash(currentPath, ...userArg.split(' '));
            break;
        case `compress ${userArg}`:
            await compress(currentPath, ...userArg.split(' '));
            break;
        case `decompress ${userArg}`:
            await decompress(currentPath, ...userArg.split(' '));
            break;

        default:
            invalidArgsLog(args);
            break;
    }

    printCurrentPath(args, currentPath);

})

rlInterface.on('SIGINT', async () => {
    userExit(userName, rlInterface);
});