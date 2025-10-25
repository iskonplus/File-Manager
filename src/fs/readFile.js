import { createReadStream } from 'fs';
const error = new Error('Operation failed.');


export const printFile = async (filePath) => {

    const readStream = createReadStream(filePath);

    readStream.pipe(process.stdout);
    readStream.on('error', _ => {

        console.error('Something go wrong:', error.message);
        console.log(' ');

    });

}