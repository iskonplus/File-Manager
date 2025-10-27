import path from 'path';
import { mkdir } from 'fs/promises';
import { errOperation } from '../errors/errOperation.js'


export const createPath = async(currentPath, userPath) => {
    const filePath = path.join(currentPath, userPath);

    try {
        console.log(' ');
        await mkdir(filePath, { recursive: true });
        console.log('Folder has been created.');
        
    } catch {
        const error = errOperation();
        console.error(error.message);
    }
}