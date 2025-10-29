import { createReadStream } from 'fs';
import { pipeline } from 'stream/promises';
import { errOperation } from '../errors/errOperation.js';
import { finished } from 'node:stream/promises';
import path from 'path';
import { getNormalizePath, validateDirectory, validateFile } from '../utils/utils.js';


export const printFile = async (currentPath, userPath) => {

    console.log(' ');

    try {

        const filePath = await getNormalizePath(currentPath, userPath);
        const baseName = path.basename(filePath);
        const baseDir = path.dirname(filePath);

        await validateFile(filePath);
        await validateDirectory(baseDir);

        const readStream = createReadStream(filePath);

        readStream.pipe( process.stdout, { end: false });
        await finished(readStream);
        
        process.stdout.write('\n');
        process.stdout.write(`File ${baseName} has been read from ${baseDir}`);
        process.stdout.write('\n');

    } catch {
        const error = errOperation();
        console.error(error.message);
    }


}