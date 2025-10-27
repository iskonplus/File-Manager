import { cp, rm } from './barrelFs.js';
import { errOperation } from '../errors/errOperation.js';



export const moveFile = async (currentPath, fileName, filePath) => {

    try {
        await cp(currentPath, fileName, filePath);
        await rm(currentPath, fileName);
        
    } catch {
        const error = errOperation();
        console.error(error.message);
    }
}