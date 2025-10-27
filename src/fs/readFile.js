import { createReadStream } from 'fs';
import { errOperation } from '../errors/errOperation.js';
import path from 'path';


export const printFile = async (currentPath, userPath) => {

    const filePath = path.join(currentPath, userPath)
    const readStream = createReadStream(filePath);

    readStream.pipe(process.stdout);
    readStream.on('error', _ => {

        const error = errOperation();
        console.error(error.message);
        console.log(' ');

    });

}