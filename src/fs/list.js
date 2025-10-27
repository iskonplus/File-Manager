import { readdir } from 'fs/promises';
import {errOperation} from '../errors/errOperation.js'


export const list = async (currentPath) => {

  try {
    const entries = await readdir(currentPath, { withFileTypes: true });
    const rows = entries.map(ent => ({
      Name: ent.name,
      Type: ent.isDirectory() ? 'directory' : 'file',
    }));
      
      console.log(' ');
      console.table(rows);
      
  } catch {
    const error = errOperation();
    console.error(error.message);
  }

};