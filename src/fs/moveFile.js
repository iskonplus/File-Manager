import { cpFile } from './copyFile.js';
import { deletePath } from './deletePath.js';
import { errOperation } from '../errors/errOperation.js';



export const moveFile = async (currentPath, fileName, filePath) => {

    try {
        await cpFile(currentPath, fileName, filePath);
        await deletePath(currentPath, fileName);
        
    } catch {
        const error = errOperation();
        console.error(error.message);
    }
}