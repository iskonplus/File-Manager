import { createReadStream } from "fs";

export const printFile = async (filePath) => {
    return new Promise((resolve, reject) => {
        const readStream = createReadStream(filePath, 'utf-8');
    readStream.pipe(process.stdout);
    readStream.on('error', err => reject(err));

        readStream.on('end', () => {
        resolve()
        console.log('\n--- Your file has been read ---');
    })
    })
    
}