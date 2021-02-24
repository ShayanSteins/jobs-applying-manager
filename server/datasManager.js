const fs = require('fs')

/**
 * Vérifie l'existence d'un fichier, et le créé le cas échéant
 * @param {String} path : chemin d'accès au fichier
 * @param {String} fileName : Nom du fichier recherché
 */
function createFileIfNotExist(path, fileName) {
  if (!fs.existsSync(path + fileName)) {
    fs.copyFileSync(path + 'modelDatas.json', path + fileName)
  }
}

/**
 * Ecrase le contenu d'un fichier
 * @param {String} pathFileName : chemin d'accès au fichier + nom du fichier
 * @param {String} content : contenu JSON stringifier à écrire dans le fichier
 */
function updateContent(pathFileName, content) {
  fs.writeFileSync(pathFileName, content, (err) => {
    if (err) throw err
    console.log('The file has been saved!')
  })
}

module.exports = { createFileIfNotExist, updateContent }