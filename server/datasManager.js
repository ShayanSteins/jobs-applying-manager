const fs = require('fs')

function createFileIfNotExist(path, fileName) {
  if (!fs.existsSync(path + fileName)) {
    fs.copyFileSync(path + 'modelDatas.json', path + fileName)
  }
}

function updateContent(pathFileName, content) {
  fs.writeFileSync(pathFileName, content, (err) => {
    if (err) throw err
    console.log('The file has been saved!')
  })
}

module.exports = { createFileIfNotExist, updateContent }