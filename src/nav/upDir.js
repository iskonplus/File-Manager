import path from 'path';
export const upDir = (rootPath, currentPath) => {
    console.log(' ');

    if (rootPath === currentPath) {
        console.log('You are already in the root folder');
        return currentPath;
    }

    const parentPath = path.dirname(currentPath);
    process.chdir(parentPath);
    console.log('Directory has been changed.');
    
    return parentPath;

}