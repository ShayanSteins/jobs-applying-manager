import fs from 'node:fs'
import { UUID } from '../../type'
import { Opportunity } from '../domain/opportunity.entity'
import { dbPath } from '../../assets/config.json'
import { mapTo } from '../../datasManager'

export interface OpportunitiesDataSource {
  persist(userId: number, opportunity: Opportunity): void
  getAll(userId: number): Promise<Opportunity[] | null>
  find(uuid: UUID): Promise<Opportunity | null>
}

export class JsonOpportunityDataSource implements OpportunitiesDataSource {
  constructor(userId: number) {
    this.createFileIfNotExist(dbPath, `datas${userId}.json`)
    console.log('Connected to DB')
  }

  persist(userId: number, opportunity: Opportunity): void {
    try {
      const bufferedDatas = fs.readFileSync(dbPath + `datas${userId}.json`, 'utf8')
      let content = JSON.parse(bufferedDatas.toString())
      let existingOpportunity = content.findIndex((olOpportunity) => olOpportunity.uuid === opportunity.uuid)
      
      if (existingOpportunity === -1) {
        content.push(opportunity)
      } else {
        content[existingOpportunity] = opportunity 
      }
      
      fs.writeFileSync(dbPath + `datas${userId}.json`, JSON.stringify(content))
      console.log('File has been saved')
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  getAll(userId: number): Promise<Opportunity[] | null> {
    let datas
    try {
      datas = JSON.parse(fs.readFileSync(dbPath + `datas${userId}.json`, 'utf8'))
      return datas.map((item) => ({
        uuid: item.uuid,
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
      }))
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  find(uuid: UUID): Promise<Opportunity | null> {
    throw new Error('Method not implemented.')
  }

  private createFileIfNotExist(path: string, fileName: string): void {
    if (!fs.existsSync(path + fileName)) {
      fs.copyFileSync(path + 'modelDatas.json', path + fileName)
    }
  }
}
