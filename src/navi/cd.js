import fs from 'node:fs';

export const commandCd = (args, path) => {

    let userPath = args.split(' ')[1];
    let currentPath;
    let newPath = path;
    const isAbsolutePathPattern = /^[a-zA-Z]:\\|\\\\/;

    if (isAbsolutePathPattern.test(userPath)) {
        currentPath = `${userPath}`;
    } else {
        currentPath = `${path}${userPath}`;
    }

    try {
        fs.lstatSync(currentPath).isDirectory();
        newPath = currentPath;
    } catch (e) {
        if (e.code == 'ENOENT') {
            console.log('Operation failed');
        }
    }

    return newPath;
}

