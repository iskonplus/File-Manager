import { rename } from 'fs/promises';

export const renameFile = async (currentPath, newPath) => {
    try {
        await rename(currentPath, newPath);
        console.log(`File has been renamed: ${newPath}`);
    } catch (err) {
        console.log(err);
    }

}