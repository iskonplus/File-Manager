import { access, stat } from 'fs/promises';
import path from 'path';
import { errOperation } from '../errors/errOperation.js'; // () => new Error('Operation failed')

export const changeDirectory = async (currentPath, userPath) => {
  console.log(' ');

  try {

    const newPath = path.isAbsolute(userPath)
      ? path.normalize(userPath)
      : path.resolve(currentPath, userPath);

    if (path.resolve(newPath) === path.resolve(currentPath)) {
      return currentPath;
    }

    await access(newPath).catch(() => { throw errOperation(); });

    const stats = await stat(newPath).catch(() => { throw errOperation(); });
    if (!stats.isDirectory()) throw errOperation();

    process.chdir(newPath);
    console.log('Directory has been changed.');
    return newPath;

  } catch (err) {
    console.error(err.message);
    return currentPath;
  }
};