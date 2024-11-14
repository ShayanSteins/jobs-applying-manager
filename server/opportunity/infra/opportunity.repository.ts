import { OpportunityType, UUID } from '../domain/opportunity.type'
import { OpportunitiesDataSource } from './opportunity.data-source'

export interface OpportunityRepositoryInterface {
  getAllByUser(): Promise<OpportunityType[]>
  persist(opportunity: OpportunityType): Promise<OpportunityType>
  delete(uuids: UUID[]): Promise<OpportunityType[]>
}

export class OpportunityRepository implements OpportunityRepositoryInterface {
  private opportunitiesDataSource: OpportunitiesDataSource

  constructor(opportunitiesDataSource: OpportunitiesDataSource) {
    this.opportunitiesDataSource = opportunitiesDataSource
  }

  async getAllByUser(): Promise<OpportunityType[]> {
    return this.opportunitiesDataSource.getAll()
  }

  async persist(opportunity: OpportunityType): Promise<OpportunityType> {
    await this.opportunitiesDataSource.persist(opportunity)
    return opportunity
  }

  async delete(uuids: UUID[]): Promise<OpportunityType[]> {
    const opportunities = await this.opportunitiesDataSource.delete(uuids)
    return opportunities
  }
}
