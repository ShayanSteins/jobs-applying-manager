import { UseCase } from '../../../core/use-case'
import { Opportunity } from '../../domain/opportunity.entity'
import { OpportunityRepositoryInterface } from '../../infra/opportunity.repository'

export class GetUserOpportunitiesUseCase implements UseCase<Opportunity[]> {
  private opportunityRepository: OpportunityRepositoryInterface

  constructor(opportunityRepository: OpportunityRepositoryInterface) {
    this.opportunityRepository = opportunityRepository
  }

  async execute(): Promise<Opportunity[]> {    
    return this.opportunityRepository.getAllByUser()
  }
}
