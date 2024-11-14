import fs from 'node:fs'
import { UUID } from '../../type'
import { Opportunity } from '../domain/opportunity.entity'
import { dbPath } from '../../assets/config.json'

export interface OpportunitiesDataSource {
  getAll(): Promise<Opportunity[]>
  persist(opportunity: Opportunity): void
  delete(uuids: UUID[]): Promise<Opportunity[]>
}

export class JsonOpportunityDataSource implements OpportunitiesDataSource {
  private primaryId: number

  constructor(userId: number) {
    this.createFileIfNotExist(dbPath, `datas${userId}.json`)
    this.primaryId = userId
    console.log('Connected to DB')
  }

  getAll(): Promise<Opportunity[]> {
    let datas
    try {
      datas = JSON.parse(fs.readFileSync(dbPath + `datas${this.primaryId}.json`, 'utf8'))
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

  persist(opportunity: Opportunity): void {
    try {
      const bufferedDatas = fs.readFileSync(dbPath + `datas${this.primaryId}.json`, 'utf8')
      let content = JSON.parse(bufferedDatas.toString())
      let existingOpportunity = content.findIndex(
        (olOpportunity) => olOpportunity.uuid === opportunity.uuid
      )

      if (existingOpportunity === -1) {
        content.push(opportunity)
      } else {
        content[existingOpportunity] = opportunity
      }

      fs.writeFileSync(dbPath + `datas${this.primaryId}.json`, JSON.stringify(content))
      console.log('File has been saved')
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  delete(uuids: UUID[]): Promise<Opportunity[]> {
    let allOpportunities
    try {
      allOpportunities = JSON.parse(fs.readFileSync(dbPath + `datas${this.primaryId}.json`, 'utf8'))

      let mapped = allOpportunities.map((item) => ({
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

      mapped.filter((opportunity, index, array) => {
        if (uuids.includes(opportunity.uuid)) {
          array.splice(index, 1)
          return true
        }
        return false
      })

      fs.writeFileSync(dbPath + `datas${this.primaryId}.json`, JSON.stringify(mapped))

      return mapped
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  private createFileIfNotExist(path: string, fileName: string): void {
    if (!fs.existsSync(path + fileName)) {
      fs.copyFileSync(path + 'modelDatas.json', path + fileName)
    }
  }
}
