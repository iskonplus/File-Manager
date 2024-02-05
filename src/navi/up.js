import path from 'node:path';

export const commandUp = (currentPath) => {
    const prevPathArr = currentPath.split(path.sep);

    if (prevPathArr.length > 1) {
        prevPathArr.pop();
    }

    if (prevPathArr.length === 1) {
        return path.join(...prevPathArr, path.sep);
    }

    const newPath = path.join(...prevPathArr);

    return newPath;
}