import fs from 'node:fs'
import { dbPath } from '../../assets/config.json'
import { OpportunityType, UUID } from '../domain/opportunity.type'

export interface OpportunitiesDataSource {
  getAll(): Promise<OpportunityType[]>
  persist(opportunity: OpportunityType): void
  delete(uuids: UUID[]): Promise<OpportunityType[]>
}

export class JsonOpportunityDataSource implements OpportunitiesDataSource {
  private primaryId: number

  constructor(userId: number) {
    this.createFileIfNotExist(dbPath, `datas${userId}.json`)
    this.primaryId = userId
    console.log('Connected to DB')
  }

  async getAll(): Promise<OpportunityType[]> {
    try {
      return this.getData()
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  async persist(opportunity: OpportunityType): Promise<void> {
    try {
      let content = await this.getData()
      let existingOpportunity = content.findIndex(
        (olOpportunity) => olOpportunity.uuid === opportunity.uuid
      )

      if (existingOpportunity === -1) {
        content.push(opportunity)
      } else {
        content[existingOpportunity] = opportunity
      }

      await this.putData(content)
      console.log('File has been saved')
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  async delete(uuids: UUID[]): Promise<OpportunityType[]> {
    try {
      const allOpportunities = await this.getData()

      allOpportunities.filter((opportunity, index, array) => {
        if (uuids.includes(opportunity.uuid)) {
          array.splice(index, 1)
          return true
        }
        return false
      })

      await this.putData(allOpportunities)
      return allOpportunities

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

  private async getData(): Promise<OpportunityType[]> {
    const jsonData = JSON.parse(fs.readFileSync(dbPath + `datas${this.primaryId}.json`, 'utf8'))
    return jsonData.map((item: OpportunityType) => ({
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
  }

  private async putData(dataToWrite: OpportunityType[]): Promise<void> {
    fs.writeFileSync(dbPath + `datas${this.primaryId}.json`, JSON.stringify(dataToWrite))
  }
}
