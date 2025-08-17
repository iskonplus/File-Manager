import { createReadStream, createWriteStream } from 'fs';

export const copyPath = (currentPath, newPath) => {
    return new Promise((resolve, reject) => {
        try {
            const readStream = createReadStream(currentPath);
            const writeStream = createWriteStream(newPath);

            readStream.pipe(writeStream);
            writeStream.on("close", () => {
                console.log(`File has been copied: ${currentPath} → ${newPath}`);
                resolve();
            });

        } catch (err) {
            reject(err)
        }
    })
}