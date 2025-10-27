import path from 'path';
import fs from 'fs';
import { errOperation } from '../errors/errOperation.js';




export const deletePath = async (currentPath, fileName) => {

    const filePath = path.join(currentPath, fileName);
    
    try {
        await fs.promises.unlink(filePath);
        console.log(`File ${fileName} has been deleted from ${currentPath}`);

    } catch {
        const error = errOperation();
        console.error( error.message );
    }

}