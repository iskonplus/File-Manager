import { getUserName } from "./cli/args.js";
import { userExit } from "./userManager/userExit.js";
import readline from 'readline/promises';
import { printInstruction } from './userManager/help.js'
import { getEOL, getHomeDir, cpuInfo, getUser, getCpuArchitecture } from './os/getOs.js';
import { list } from './fs/list.js'
import { printFile } from "./fs/readFile.js";
import { createFile } from './fs/addFile.js';
import { removePath } from './fs/deletePath.js';
import { createFolder } from './fs/createNewPath.js'
import { renameFile } from "./fs/renameFile.js";
import { copyPath } from './fs/copyPath.js'
import { changeDirectory } from './nav/cdPath.js'
import { upDir } from './nav/upDir.js';
import { calcHash } from "./hash/calcHash.js";
import { compressFile } from './compression/compress.js';
import {decompressFile} from './compression/decompress.js'

const rootDir = getHomeDir();
let currentPath = rootDir;
const userName = getUserName();


console.log(`Welcome to the File Manager, ${userName}!`);
console.log(`Please enter your command or '.help' to see all the commands.`);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.on('line', async userArgs => {

    const trimUserArgs = userArgs.trim();

    switch (trimUserArgs) {
        case '.exit':
            userExit(userName);
            rl.close();
            break;
        case '.help':
            await printInstruction();
            break;
        case 'ls':
            console.log('List of all files and folders in current directory:');
            await list(currentPath);
            break;
        case 'os --EOL':
            console.log(`Default EOL is ${getEOL()}`);
            break;
        case 'os --homedir':
            console.log(`Home dir is ${getHomeDir()}`);
            break;
        case 'os --cpus':
            console.log(`Info about processor: ${cpuInfo()}`);
            break;
        case 'os --username':
            console.log(`User name is: ${getUser()}`);
            break;
        case 'os --architecture':
            console.log(`CPU architecture is: ${getCpuArchitecture()}`);
            break;

        case trimUserArgs.startsWith('cat') && trimUserArgs:
            const readFilePath = trimUserArgs.slice('4').trim()
            await printFile(currentPath + '/' + readFilePath);
            break;
        case trimUserArgs.startsWith('add') && trimUserArgs:
            const addFilePath = trimUserArgs.slice('4').trim()
            await createFile(currentPath + '/' + addFilePath);
            break;
        case trimUserArgs.startsWith('rm') && trimUserArgs:
            const removeFilePath = trimUserArgs.slice('3').trim()
            await removePath(currentPath + '/' + removeFilePath);
            break;
        case trimUserArgs.startsWith('mkdir') && trimUserArgs:
            const createNewPath = trimUserArgs.slice('6').trim()
            await createFolder(currentPath + '/' + createNewPath);
            break;
        case trimUserArgs.startsWith('rn') && trimUserArgs:
            let filePath = '';
            let newFilePath = '';
            trimUserArgs.slice('3').trim().split(' ').forEach((path, index) => {
                index === 0 ? filePath = path : newFilePath = path;
            }
            )
            await renameFile(currentPath + '/' + filePath, currentPath + '/' + newFilePath);
            break;
        case trimUserArgs.startsWith('cp') && trimUserArgs:
            const cpPath = trimUserArgs.slice('3').trim().split(' ')[0];
            const cpNewPath = trimUserArgs.slice('3').trim().split(' ')[1];
            await copyPath(currentPath + '/' + cpPath, currentPath + '/' + cpNewPath);
            break;
        case trimUserArgs.startsWith('mv') && trimUserArgs:
            const mwPath = trimUserArgs.slice('3').trim().split(' ')[0];
            const mwNewPath = trimUserArgs.slice('3').trim().split(' ')[1];
            await copyPath(currentPath + '/' + mwPath, currentPath + '/' + mwNewPath + '/' + mwPath);
            await removePath(currentPath + '/' + mwPath);
            break;
        case trimUserArgs.startsWith('cd') && trimUserArgs:
            const cdPath = trimUserArgs.slice('3').trim();
            currentPath = await changeDirectory(currentPath + '/' + cdPath,);
            break;
        case trimUserArgs.startsWith('up') && trimUserArgs:
            currentPath = upDir(rootDir, currentPath);
            break;
        case trimUserArgs.startsWith('hash') && trimUserArgs:
            const hashFilePath = trimUserArgs.slice('5').trim();
            await calcHash(currentPath + '/' + hashFilePath);
            break;
        case trimUserArgs.startsWith('compress') && trimUserArgs:
            const compressFilePath = trimUserArgs.slice('9').trim();
            await compressFile(currentPath + '/' + compressFilePath );
            break;
        case trimUserArgs.startsWith('decompress') && trimUserArgs:
            const deCompressFilePath = trimUserArgs.slice('11').trim();
            await decompressFile(currentPath + '/' + deCompressFilePath );
            break;
        default:
            console.log(`Invalid input: ${userArgs}`);
            break;
    }
    console.log('');
    console.log(`>>> You are currently in ${currentPath}`);

})

rl.on('SIGINT', async () => {
    userExit(userName);
    rl.close();
});