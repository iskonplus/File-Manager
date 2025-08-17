import { stat, rm, unlink } from 'fs/promises';

export const removePath = async (path) => {
    try {
        const removeFilePath = await stat(path);

        if (removeFilePath.isDirectory()) {
            await rm(path, { recursive: true, force: true });
            console.log(`Folder has been deleted: ${path}`);
        } else if (removeFilePath.isFile()) {
            await unlink(path);
            console.log(`File has been deleted: ${path}`);
        }

    } catch (err) {
        console.log(err);
    }

}