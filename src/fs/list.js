import { readdir } from 'fs/promises';
import {error} from '../errors/error.js'


export const list = async (currentPath) => {
  try {
    const entries = await readdir(currentPath, { withFileTypes: true });
    const rows = entries.map(ent => ({
      Name: ent.name,
      Type: ent.isDirectory() ? 'directory' : 'file',
    }));
      
      console.log(' ');
      console.table(rows);
      
  } catch (err) {
    err => err && console.error(error.message);
  }

};