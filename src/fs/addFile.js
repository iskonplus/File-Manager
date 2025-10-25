import { writeFile } from 'fs/promises';
import { error } from '../errors/error.js';
import path from 'path'

export const createFile = async (currentPath, userPath) => {
    const filePath = path.join(currentPath, userPath);
    try {
        console.log(' ');
        await writeFile(filePath, '', { flag: 'wx' });
        console.log('File has been created.');
        
    } catch (err) {
        console.error('Something went wrong:', error.message);
    }
}