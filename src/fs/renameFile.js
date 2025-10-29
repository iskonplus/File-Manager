import { rename } from 'fs/promises';
import path from 'path';
import { errOperation } from '../errors/errOperation.js';
import { getNormalizePath, validateDirectory, validateFile } from '../utils/utils.js';


export const renameFile = async (currentPath, fileName, newFileName) => {

    try {

        const filePath = await getNormalizePath(currentPath, fileName);
        const baseName = path.basename(fileName);
        const baseDir = path.dirname(filePath);

        await validateDirectory(baseDir);
        await validateFile(filePath);

        const newBaseName = path.basename(newFileName);
        const newFilePath = path.join(baseDir, newBaseName);

        console.log(' ');
        await rename(filePath, newFilePath);
        console.log(`File ${baseName} has been renamed to ${newBaseName}`);

    } catch {
        const error = errOperation();
        console.error(error.message);
    }

}