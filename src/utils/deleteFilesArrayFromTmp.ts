import { resolve } from 'path';
import fs from 'fs';

import uploadConfig from '../config/uploadConfig';

// Função para remover uma lista de arquivos presentes na pasta tmp
const deleteFilesArrayFromTmp = async (filesName: string[]) => {
  // Recuperando o diretório da pasta
  const { tmpFolder } = uploadConfig;

  // Percorrendo a lista dos arquivos
  for(let i in filesName) {
    // Recuperando o diretório do arquivo
    const fileDirectoryName = resolve(`${tmpFolder}`, filesName[i]);

    // Verificando se o arquivo existe
    try {
      await fs.promises.stat(fileDirectoryName);
    } catch {
      // Continuar para o próximo arquivo
      return;
    }

    // Caso o arquivo exista, remove-lo do sistema
    await fs.promises.unlink(fileDirectoryName);
  }
};

export default deleteFilesArrayFromTmp;
