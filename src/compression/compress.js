import path from 'path';
import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';
import { errOperation } from '../errors/errOperation.js';
import { createBrotliCompress } from 'zlib';
import { access, stat } from 'fs/promises';

export const compressFile = async (currentPath, fileName, userPath) => {
    console.log(' ');

    try {
        const filePath = path.join(currentPath, fileName);
        const baseName = path.basename(filePath);
        const newFilePath = path.join(currentPath, userPath, `${baseName}.br`);

        await pipeline(
            createReadStream(filePath),
            createBrotliCompress(),
            createWriteStream(newFilePath, { flags: 'wx' })
        )
        
    } catch {
        const error = errOperation();
        console.error(error.message);
        
    }
    
}