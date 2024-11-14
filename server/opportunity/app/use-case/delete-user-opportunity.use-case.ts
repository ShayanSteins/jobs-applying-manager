import { UseCase } from '../../../core/use-case'
import { UUID } from '../../../type'
import { Opportunity } from '../../domain/opportunity.entity'
import { OpportunityRepositoryInterface } from '../../infra/opportunity.repository'

export class DeleteUserOpportunityUseCase implements UseCase<Opportunity[]> {
  private opportunityRepository: OpportunityRepositoryInterface

  constructor(opportunityRepository: OpportunityRepositoryInterface) {
    this.opportunityRepository = opportunityRepository
  }

  async execute(payload: { uuids: UUID[] }): Promise<Opportunity[]> {
    return this.opportunityRepository.delete(payload.uuids)
  }
}
