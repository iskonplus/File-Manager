import { stat } from 'fs/promises';

export const changeDirectory = async newPath => {
    try {
    const isNewPathDirectory = await stat(newPath);
    if (!isNewPathDirectory.isDirectory()) {
      throw new Error("Not a directory");
    }
    process.chdir(newPath);
    console.log(`Directory has been changed: ${newPath}`);

        return newPath;
        
  } catch (err) {
    console.error("Something go wrong:", err.message);
    return currentPath;
  }
}