import path from 'path';
import fs from 'fs';
import { error } from '../errors/error.js';




export const deletePath = async (currentPath, fileName) => {

    const filePath = path.join(currentPath, fileName);
    
    try {
        await fs.promises.unlink(filePath);
        console.log(`File ${fileName} has been deleted from ${currentPath}`);
        console.log(' ');

    } catch {
        console.error('Something went wrong:', error.message);
    }

}