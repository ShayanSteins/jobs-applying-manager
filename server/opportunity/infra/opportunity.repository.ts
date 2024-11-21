import { Opportunity } from '../domain/opportunity.entity'
import { UUID } from '../domain/opportunity.type'
import { OpportunitiesDataSource } from './opportunity.data-source'

export interface OpportunityRepositoryInterface {
  getAllByUser(): Promise<Opportunity[]>
  persist(opportunity: Opportunity): Promise<Opportunity>
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

  async persist(opportunity: Opportunity): Promise<Opportunity> {
    await this.opportunitiesDataSource.persist(opportunity)
    return opportunity
  }

  async delete(uuids: UUID[]): Promise<Opportunity[]> {
    const opportunities = await this.opportunitiesDataSource.delete(uuids)
    return opportunities
  }
}
