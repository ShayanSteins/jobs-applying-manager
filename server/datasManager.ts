import fs from 'fs'

/**
 * Vérifie l'existence d'un fichier, et le créé le cas échéant
 * @param {string} path : chemin d'accès au fichier
 * @param {string} fileName : Nom du fichier recherché
 */
export function createFileIfNotExist(path: string, fileName: string): void {
  if (!fs.existsSync(path + fileName)) {
    fs.copyFileSync(path + 'modelDatas.json', path + fileName)
  }
}

/**
 * Ecrase le contenu d'un fichier
 * @param {string} pathFileName : chemin d'accès au fichier + nom du fichier
 * @param {string} content : contenu JSON stringifier à écrire dans le fichier
 */
export function updateContent(pathFileName: string, content: string): void {
  try {
    fs.writeFileSync(pathFileName, content)
    console.log('The file has been saved!')
  } catch (error) {
    throw error
  }
}
