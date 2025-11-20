import path from 'path';
import { getNormalizePath, validateDirectory } from '../utils/utils.js';

export const changeDirectory = async (currentPath, userPath) => {
  
  try {
    
    const newPath = await getNormalizePath(currentPath, userPath);
    
    if (path.resolve(newPath) === path.resolve(currentPath)) {
      return currentPath;
    }
    
    await validateDirectory(newPath);
    process.chdir(newPath);

    console.log(' ');
    console.log('Directory has been changed.');
    return newPath;

  } catch (err) {
    console.error(err.message);
    return currentPath;
  }
  
};