import { rename } from 'fs/promises';
import path from 'path';
import { errOperation } from '../errors/errOperation.js';


export const renameFile = async (currentPath, fileName, newFileName) => {

    const filePath = path.join(currentPath, fileName);
    const newFilePath = path.join(currentPath, newFileName);

    try {
        console.log(' ');
        await rename(filePath, newFilePath);
        console.log('File has been renamed');

    } catch {
        const error = errOperation();
        console.error(error.message);
    }

}