import path from 'path';
import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';
import { errOperation } from '../errors/errOperation.js';
import { createBrotliDecompress } from 'zlib';
import { getNormalizePath, validateDirectory, validateFile } from '../utils/utils.js';


export const decompressFiles = async (currentPath, fileName, userPath) => {
    console.log(' ');

    try {

        const filePath = await getNormalizePath(currentPath, fileName);
        const baseName = path.basename(filePath);

        const clearBaseName = baseName.endsWith('.br')
            ? baseName.slice(0, -3)
            : undefined;

        if (!clearBaseName) throw Error();

        const newDir = await getNormalizePath(currentPath, userPath);

        await validateFile(filePath);
        await validateDirectory(newDir);

        const newFilePath = path.join(newDir, clearBaseName);

        await pipeline(
            createReadStream(filePath),
            createBrotliDecompress(),
            createWriteStream(newFilePath, { flags: 'wx' })
        )


        console.log(`File ${baseName} has been decompressed to ${newDir}`);

    } catch {
        const error = errOperation();
        console.error(error.message);
    }
}