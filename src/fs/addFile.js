import { writeFile } from 'fs/promises';
import { errOperation } from '../errors/errOperation.js';
import path from 'path'


export const createFile = async (currentPath, userPath) => {
    
    const baseName = path.basename(userPath);
    const filePath = path.join(currentPath, baseName);

    try {
        console.log(' ');
        await writeFile(filePath, '', { flag: 'wx' });
        console.log(`File ${baseName} has been created in your current directory.`);
        
    } catch {
        const error = errOperation();
        console.error(error.message);
    }
}