import { cpFile } from './copyFile.js';
import { deletePath } from './deletePath.js';
import { error } from '../errors/error.js';



export const moveFile = async (currentPath, fileName, filePath) => {

    try {
        await cpFile(currentPath, fileName, filePath);
        await deletePath(currentPath, fileName);
        
    } catch (err) {
        console.error('Something went wrong: ', error.message);
    }
}