import path from 'path';
import { pipeline } from 'stream/promises';
import { createReadStream, createWriteStream } from 'fs';
import { errOperation } from '../errors/errOperation.js';
import { getNormalizePath, validateFile, validateDirectory } from '../utils/utils.js';


export const cpFile = async (currentPath, fileName, newPath) => {
    try {

        const filePath = await getNormalizePath(currentPath, fileName);
        const baseName = path.basename(fileName);
        const newDir = await getNormalizePath(currentPath, newPath);

        await validateFile(filePath);
        await validateDirectory(newDir);

        const newFilePath = path.join(newDir, baseName);


        await pipeline(
            createReadStream(filePath),
            createWriteStream(newFilePath)
        );
        console.log(' ');
        console.log(`File ${baseName} has been copied to ${newDir}`);

    } catch {
        const error = errOperation();
        console.error(error.message);
    }

}