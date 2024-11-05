import fs from 'node:fs'
import { EventDate, OpportunityHistory, UUID } from '../type'
import { dbPath } from '../assets/config.json'

class Opportunity {
  id: string
  state: string
  company: string
  contact: string
  location: string
  technologies: string
  url: string
  notes: string
  history: [OpportunityHistory]
  closed: boolean
  dates: [EventDate]

  constructor(id: UUID) {
    this.id = id
  }
}

export interface OpportunityRepositoryInterface {
  persist(opportunity: Opportunity): boolean
  getAll(userId: string): [Opportunity] | null
  findById(id: UUID): Opportunity | null
}

class JsonOpportunityRepository implements OpportunityRepositoryInterface {
  constructor(userId: string) {
    this.createFileIfNotExist(dbPath, `datas${userId}.json`)
    console.log('Connected to DB')
  }

  persist(opportunity: Opportunity): boolean {
    /* To be implemented */
    return false
  }

  getAll(userId: string): [Opportunity] | null {
    let datas
    let opportunities: [Opportunity]
    try {
      datas = JSON.parse(fs.readFileSync(dbPath + `datas${userId}.json`, 'utf8'))
      datas.forEach((opportunity) => {
        opportunities.push(new Opportunity(opportunity.id))
      })
    } catch (error) {
      console.error(error)
      throw error
    }
    return null
  }

  findById(id: UUID): Opportunity | null {
    /* To be implemented */
    return null
  }

  private createFileIfNotExist(path: string, fileName: string): void {
    if (!fs.existsSync(path + fileName)) {
      fs.copyFileSync(path + 'modelDatas.json', path + fileName)
    }
  }
}

class OpportunityManagerService {
  constructor(private opportunityRepository: OpportunityRepositoryInterface) {
    this.opportunityRepository = opportunityRepository
  }
}
