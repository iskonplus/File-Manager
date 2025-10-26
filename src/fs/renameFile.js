import { rename } from 'fs/promises';
import path from 'path';
import { error } from '../errors/error.js';


export const renameFile = async (currentPath, fileName, newFileName) => {

    const filePath = path.join(currentPath, fileName);
    const newFilePath = path.join(currentPath, newFileName);

    try {
        console.log(' ');
        await rename(filePath, newFilePath);
        console.log('File has been renamed');

    } catch (err) {
        console.error('Something went wrong: ', error.message);
    }

}