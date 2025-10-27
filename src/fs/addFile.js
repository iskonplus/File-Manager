import { writeFile } from 'fs/promises';
import { errOperation } from '../errors/errOperation.js';
import path from 'path'


export const createFile = async (currentPath, userPath) => {
    
    const filePath = path.join(currentPath, userPath);
    try {
        console.log(' ');
        await writeFile(filePath, '', { flag: 'wx' });
        console.log('File has been created.');
        
    } catch {
        const error = errOperation();
        console.error(error.message);
    }
}