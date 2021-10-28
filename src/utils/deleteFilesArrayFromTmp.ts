import { resolve } from 'path';
import fs from 'fs';

import uploadConfig from '../config/uploadConfig';

const deleteFilesArrayFromTmp = async (filesName: string[]) => {
  const { tmpFolder } = uploadConfig;

  for(let i in filesName) {
    const fileDirectoryName = resolve(`${tmpFolder}`, filesName[i]);

    try {
      await fs.promises.stat(fileDirectoryName);
    } catch {
      return;
    }

    await fs.promises.unlink(fileDirectoryName);
  }
};

export default deleteFilesArrayFromTmp;
