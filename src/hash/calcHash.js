import { createHash } from "crypto";
import { createReadStream } from "fs";
import { stat } from "fs/promises";
import { stdout, stderr } from "process";

export const calcHash = async (filePath) => {
  const info = await stat(filePath);
  if (!info.isFile()) {
      console.error(`This path is not a file ${filePath}`);
      return null;
  }

  await new Promise((resolve, reject) => {
    const readStream = createReadStream(filePath);
    const hashStream = createHash("sha256").setEncoding("hex");

    readStream
      .on("error", reject)
      .pipe(hashStream)
      .on("error", reject)
      .once("end", () => {          
        stderr.write("\nHash has been calculated");
        resolve();
      })
      .pipe(stdout)
      .on("error", reject);
  });
};
