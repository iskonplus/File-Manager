import { createReadStream } from 'fs';
import { error } from '../errors/error.js';
import path from 'path';


export const printFile = async (currentPath, userPath) => {
    const filePath = path.join(currentPath, userPath)
    const readStream = createReadStream(filePath);

    readStream.pipe(process.stdout);
    readStream.on('error', _ => {

        console.error('Something went wrong:', error.message);
        console.log(' ');

    });

}