import path from 'path';
import { pipeline } from 'stream/promises';
import { createReadStream, createWriteStream } from 'fs';
import { errOperation } from '../errors/errOperation.js';


export const cpFile = async (currentPath, fileName, newPath) => {

    const filePath = path.join(currentPath, fileName);
    const newFilePath = path.join(currentPath, newPath, fileName);

    try {
        await pipeline(
            createReadStream(filePath),
            createWriteStream(newFilePath)
        );
        console.log(' ');
        console.log(`File ${fileName} has been copied to ${path.join(currentPath, newPath)}`);

    } catch {
        const error = errOperation();
        console.error(error.message);
    }

}