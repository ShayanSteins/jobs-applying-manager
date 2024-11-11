import { mapTo } from '../../datasManager'
import { UUID } from '../../type'
import { Opportunity } from '../domain/opportunity.entity'
import { OpportunitiesDataSource } from './opportunity.data-source'

export interface OpportunityRepositoryInterface {
  persist(userId: number, opportunity: Buffer): Promise<Opportunity>
  getAllByUser(userId: number): Promise<Opportunity[] | null>
  findById(uuid: UUID): Promise<Opportunity | null>
}

export class OpportunityRepository implements OpportunityRepositoryInterface {
  private opportunitiesDataSource: OpportunitiesDataSource

  constructor(opportunitiesDataSource: OpportunitiesDataSource) {
    this.opportunitiesDataSource = opportunitiesDataSource
  }

  async persist(userId: number, opportunity: Buffer): Promise<Opportunity> {   
    const jsonOpportunity = mapTo(opportunity)[0]
    await this.opportunitiesDataSource.persist(userId, jsonOpportunity)
    return jsonOpportunity
  }

  async getAllByUser(userId: number): Promise<Opportunity[] | null> {
    return this.opportunitiesDataSource.getAll(userId)
  }
  
  async findById(uuid: UUID): Promise<Opportunity | null> {
    throw new Error('Method not implemented.')
  }
}
