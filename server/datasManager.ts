import { randomUUID } from 'crypto'
import fs from 'fs'
import { Opportunity } from './opportunity/domain/opportunity.entity'

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
// export function updateContent(pathFileName: string, content: string): void {
//   try {
//     fs.writeFileSync(pathFileName, content)
//     console.log('The file has been saved!')
//   } catch (error) {
//     throw error
//   }
// }

export function mapTo(datas: Buffer): Opportunity[] {
  try {
    const parsedDatas = JSON.parse(datas.toString())

    if (typeof parsedDatas === 'object') {
      return [{ uuid: parsedDatas.uuid ?? randomUUID(), ...parsedDatas }]
    } else {
      return parsedDatas.map((item) => {
        const truc = Opportunity.reconstitute({
          uuid: item.uuid ?? randomUUID(),
          state: item.state,
          company: item.company,
          contact: item.contact,
          location: item.location,
          technologies: item.technologies,
          url: item.url,
          notes: item.notes,
          history: item.history,
          closed: item.closed,
          dates: item.dates,
        })
        return truc
      })
    }
  } catch (error) {
    console.error(error)
    throw error
  }
}
