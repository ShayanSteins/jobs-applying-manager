const fs = require('fs')

function createFileIfNotExist(path, fileName) {
  if (!fs.existsSync(path + fileName)) {
    fs.copyFileSync(path + 'modelDatas.json', path + fileName)
  }
}

module.exports = { createFileIfNotExist }