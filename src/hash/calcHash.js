import path from 'path';
import { createReadStream } from 'fs';
import { pipeline } from 'stream/promises';
import { createHash } from 'crypto';
import { errOperation } from '../errors/errOperation.js';


export const calcHash = async (currentPath, userPath) => {
    console.log(' ');

    try {
        const filePath = path.join(currentPath, userPath);
        const hash = createHash('sha256');

        await pipeline(createReadStream(filePath), hash);

        const result = hash.digest('hex');
        console.log(`SHA256 hash: ${result}`);

    } catch {
        const error = errOperation();
        console.error(error.message);
    }

}