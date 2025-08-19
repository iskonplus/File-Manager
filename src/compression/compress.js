import { createReadStream, createWriteStream } from 'fs';
import { createGzip } from 'zlib';
import { pipeline } from "stream/promises";
import { stat } from 'fs/promises';


export const compressFile = async (filePath,) => {
    const info = await stat(filePath);
  if (!info.isFile()) {
      console.error(`This path is not a file ${filePath}`);
      return null;
  }
    
    try {
        await pipeline(
            createReadStream(filePath),
            createGzip(),
            createWriteStream(filePath + '.gz')
        )

        console.log("Compression has been completed.");

    } catch (err) {
        console.error("Something went wrong.", err.message);
    }

}