import { createReadStream, createWriteStream } from 'fs';
import { stat } from 'fs/promises';
import { pipeline } from 'stream';
import { createUnzip } from 'zlib';


export const decompressFile = async (filePath) => {
    const info = await stat(filePath);

    if (!info.isFile()) {
        console.error('Something went wrong');
        return null;
    }

    pipeline(
        createReadStream(filePath),
        createUnzip(),
        createWriteStream(filePath.slice(0, -3)),
        err => err ?
            console.error('Error: ', err.message) :
            console.log('Decompression completed...')
    )


}