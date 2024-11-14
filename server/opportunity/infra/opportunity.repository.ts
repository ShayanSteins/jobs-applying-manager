import { mapTo } from '../../datasManager'
import { UUID } from '../../type'
import { Opportunity } from '../domain/opportunity.entity'
import { OpportunitiesDataSource } from './opportunity.data-source'

export interface OpportunityRepositoryInterface {
  getAllByUser(): Promise<Opportunity[]>
  persist(opportunity: Buffer): Promise<Opportunity>
  delete(uuids: UUID[]): Promise<Opportunity[]>
}

export class OpportunityRepository implements OpportunityRepositoryInterface {
  private opportunitiesDataSource: OpportunitiesDataSource

  constructor(opportunitiesDataSource: OpportunitiesDataSource) {
    this.opportunitiesDataSource = opportunitiesDataSource
  }

  async getAllByUser(): Promise<Opportunity[]> {
    return this.opportunitiesDataSource.getAll()
  }

  async persist(opportunity: Buffer): Promise<Opportunity> {
    const jsonOpportunity = mapTo(opportunity)[0]
    await this.opportunitiesDataSource.persist(jsonOpportunity)
    return jsonOpportunity
  }

  async delete(uuids: UUID[]): Promise<Opportunity[]> {
    const opportunities = await this.opportunitiesDataSource.delete(uuids)
    return opportunities
  }
}
