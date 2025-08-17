import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path'; 
import { readFile } from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const error = new TypeError('FS operation failed');
const filePath = path.join(__dirname, 'actions.txt');

export const printInstruction = async () => {
  await readFile(filePath, 'utf8')
  .then(data=>console.log(data))
  .catch(err => err && console.log(error.message))
};
