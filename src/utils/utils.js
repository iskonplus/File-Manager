import path from 'path';
import { access, stat } from 'fs/promises';
import { errOperation } from '../errors/errOperation.js';


const getNormalizePath = async (currentPath, userPath) => {
    return path.isAbsolute(userPath)
        ? path.normalize(userPath)
        : path.resolve(currentPath, userPath);
}

const validateDirectory = async (dirPath) => {
    try {
        await access(dirPath);
        const resultStat = await stat(dirPath);

        if (!resultStat.isDirectory()) {
            throw errOperation();
        }
    } catch {
        throw errOperation();
    }
};

const validateFile = async (filePath) => {
    try {
        await access(filePath);
        const resultStat = await stat(filePath);
        if (!resultStat.isFile()) throw errOperation();
    } catch {
        throw errOperation();
    }
};

const invalidArgsLog = (args) => {
    console.log('');
    console.log(`Invalid input: ${args}`);
}

export { getNormalizePath, validateDirectory, validateFile,  invalidArgsLog};