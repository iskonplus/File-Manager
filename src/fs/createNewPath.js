import { mkdir } from 'fs/promises';

export const createFolder = async (path) => {
    try {
        await mkdir(path, { recursive: true });
        console.log(`Folder has been created: ${path}`);
    }
    catch (err) {
        console.log(err);
    }

}    