import { writeFile } from 'fs/promises';

export const createFile = async (path) => {
    try {
        await writeFile(path, '', { flag: 'wx' });
        console.log(`File has been created: ${path}`);

    } catch (err) {
        console.log(err);
    }
}