import { UseCase } from '../../../core/use-case'
import { OpportunityType } from '../../domain/opportunity.type'
import { OpportunityRepositoryInterface } from '../../infra/opportunity.repository'

export class GetUserOpportunitiesUseCase implements UseCase<OpportunityType[]> {
  private opportunityRepository: OpportunityRepositoryInterface

  constructor(opportunityRepository: OpportunityRepositoryInterface) {
    this.opportunityRepository = opportunityRepository
  }

  async execute(): Promise<OpportunityType[]> {
    return this.opportunityRepository.getAllByUser()
  }
}
