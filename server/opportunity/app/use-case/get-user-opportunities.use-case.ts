import { UseCase } from '../../../core/use-case'
import { UUID } from '../../../type'
import { Opportunity } from '../../domain/opportunity.entity'
import { OpportunityRepositoryInterface } from '../../infra/opportunity.repository'

export class GetUserOpportunitiesUseCase {
  private opportunityRepository: OpportunityRepositoryInterface

  constructor(opportunityRepository: OpportunityRepositoryInterface) {
    this.opportunityRepository = opportunityRepository
  }

  async execute(userId: number): Promise<Opportunity[] | null> {
    const result = await this.opportunityRepository.getAllByUser(userId)
    return result
  }
}