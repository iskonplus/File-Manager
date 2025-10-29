import path from 'path';
import { createReadStream } from 'fs';
import { pipeline } from 'stream/promises';
import { createHash } from 'crypto';
import { errOperation } from '../errors/errOperation.js';
import { getNormalizePath, validateDirectory, validateFile } from '../utils/utils.js';


export const calcHash = async (currentPath, userPath) => {
    
    try {
        const filePath = await getNormalizePath(currentPath, userPath);
        const baseName = path.basename(filePath);
        const baseDir = path.dirname(filePath);

        await validateDirectory(baseDir)
        await validateFile(filePath);

        const hash = createHash('sha256');
        await pipeline(createReadStream(filePath), hash);
        
        const result = hash.digest('hex');

        console.log(' ');
        console.log(`Hash has been calculated of: ${baseName}`);
        console.log(`SHA256 hash: ${result}`);

    } catch {
        const error = errOperation();
        console.error(error.message);
    }

}