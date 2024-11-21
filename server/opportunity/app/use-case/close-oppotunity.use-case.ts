import { UseCase } from '../../../core/use-case'
import { Opportunity } from '../../domain/opportunity.entity'
import { OpportunityRepositoryInterface } from '../../infra/opportunity.repository'

export class CloseOpportunityUseCase implements UseCase<Opportunity> {
  private opportunityRepository: OpportunityRepositoryInterface

  constructor(opportunityRepository: OpportunityRepositoryInterface) {
    this.opportunityRepository = opportunityRepository
  }

  execute(payload: { opportunity: Opportunity }): Promise<Opportunity> {
    payload.opportunity.close()
    return this.opportunityRepository.persist(payload.opportunity)
  }
}
