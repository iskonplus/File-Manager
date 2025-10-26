import path from 'path';
import { createReadStream, createWriteStream } from 'fs';
import { error } from '../errors/error.js';


export const cpFile = async (currentPath, fileName, newFileName) => {
    const filePath = path.join(currentPath, fileName);
    const newFilePath = path.join(currentPath, newFileName);

    const readStream = createReadStream(filePath);
    const writeStream = createWriteStream(newFilePath);


    readStream.pipe(writeStream);
    writeStream.on('error', () => console.error('Something went wrong: ', error.message));

    writeStream.on('close', () => {
        console.log('File has been copied');
        console.log(' ');
    });


}