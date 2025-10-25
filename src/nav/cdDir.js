import { stat } from 'fs/promises';
import path from 'path';

export const changeDirectory = async (currentPath, userPath) => {
    console.log(' ');

    try {

        if (currentPath === userPath) {
            throw new Error('You are already in this folder');
        }

        const newPath = path.isAbsolute(userPath)
            ? userPath
            : path.join(currentPath, userPath);

        const isNewPathDirectory = await stat(newPath);

        if (!isNewPathDirectory.isDirectory()) {
            throw new Error('Not a directory');
        }

        process.chdir(newPath);
        console.log('Directory has been changed.');

        return newPath;

    } catch (err) {
        console.error('Something go wrong:', err.message);
        return currentPath;
    }
}