import path from 'path';
import { mkdir } from 'fs/promises';
import { errOperation } from '../errors/errOperation.js';


export const createPath = async (currentPath, userPath) => {
    const baseDir = path.basename(userPath);
    const filePath = path.join(currentPath, baseDir);

    try {
        console.log(' ');
        await mkdir(filePath, { recursive: true });
        console.log(`Folder ${baseDir} has been created in your current directory.`);
        
    } catch {
        const error = errOperation();
        console.error(error.message);
    }
}