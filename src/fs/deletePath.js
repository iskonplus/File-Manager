import path from 'path';
import fs from 'fs';
import { errOperation } from '../errors/errOperation.js';
import { getNormalizePath, validateDirectory, validateFile } from '../utils/utils.js';




export const deletePath = async (currentPath, fileName) => {
    try {

        const filePath = await getNormalizePath(currentPath, fileName);
        const basePath = path.dirname(filePath);
        const baseName = path.basename(fileName);

        await validateDirectory(basePath);
        await validateFile(filePath);
    
    
        await fs.promises.unlink(filePath);
        console.log(`File ${baseName} has been deleted from ${basePath}`);

    } catch {
        const error = errOperation();
        console.error( error.message );
    }

}