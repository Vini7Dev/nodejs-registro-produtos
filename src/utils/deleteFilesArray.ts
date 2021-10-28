import { resolve } from 'path';
import fs from 'fs';

import uploadConfig from '../config/uploadConfig';

const deleteFilesArray = async (filesName: string[]) => {
  const { directory } = uploadConfig;

  for(let i in filesName) {
    const fileDirectoryName = resolve(`${directory}`, filesName[i]);

    try {
      await fs.promises.stat(fileDirectoryName);
    } catch {
      return;
    }

    await fs.promises.unlink(fileDirectoryName);
  }
};

export default deleteFilesArray;
