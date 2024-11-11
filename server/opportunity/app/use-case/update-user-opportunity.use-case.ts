import { UseCase } from '../../../core/use-case'
import { UUID } from '../../../type'
import { Opportunity } from '../../domain/opportunity.entity'
import { OpportunityRepositoryInterface } from '../../infra/opportunity.repository'

export class UpdateUserOpportunityUseCase {
  private opportunityRepository: OpportunityRepositoryInterface

  constructor(opportunityRepository: OpportunityRepositoryInterface) {
    this.opportunityRepository = opportunityRepository
  }

  async execute(userId: number, opportunity: Buffer): Promise<Opportunity> {
    return this.opportunityRepository.persist(userId, opportunity)    
  }
}