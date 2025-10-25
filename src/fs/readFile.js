import { createReadStream } from 'fs';
import { error } from '../errors/error.js';


export const printFile = async (filePath) => {

    const readStream = createReadStream(filePath);

    readStream.pipe(process.stdout);
    readStream.on('error', _ => {

        console.error('Something go wrong:', error.message);
        console.log(' ');

    });

}