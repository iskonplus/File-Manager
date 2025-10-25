import path from 'path';
export const upDir = (rootPath, currentPath) => {
    if (rootPath === currentPath) {
        console.log("You are already in the root folder");
        return currentPath;
    }

    const parentPath = path.dirname(currentPath);
    process.chdir(parentPath);
    return parentPath;

}