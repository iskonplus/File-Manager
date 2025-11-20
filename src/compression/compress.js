import path from 'path';
import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';
import { errOperation } from '../errors/errOperation.js';
import { createBrotliCompress } from 'zlib';
import { getNormalizePath, validateDirectory, validateFile } from '../utils/utils.js';

export const compressFile = async (currentPath, fileName, userPath) => {
    console.log(' ');

    try {
        const filePath = await getNormalizePath(currentPath, fileName);
        const baseName = path.basename(filePath);
        const newDir = await getNormalizePath(currentPath, userPath)

        await validateFile(filePath);
        await validateDirectory(newDir);

        const newFilePath = path.join(newDir, `${baseName}.br`);

        await pipeline(
            createReadStream(filePath),
            createBrotliCompress(),
            createWriteStream(newFilePath, { flags: 'wx' })
        )

        console.log(`File ${baseName} has been compressed to ${newDir}`);

    } catch {
        const error = errOperation();
        console.error(error.message);
    }

}