import { writeFile } from 'fs/promises';
import { error } from '../errors/error.js';

export const createFile = async (filePath) => {
    try {
        console.log(' ');
        await writeFile(filePath, '', { flag: 'wx' });
        console.log('File has been created.');
        
    } catch (err) {
        console.error('Something went wrong:', error.message);
    }
}