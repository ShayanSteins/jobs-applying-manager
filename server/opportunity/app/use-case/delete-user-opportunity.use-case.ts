import { UseCase } from '../../../core/use-case'
import { OpportunityType, UUID } from '../../domain/opportunity.type'
import { OpportunityRepositoryInterface } from '../../infra/opportunity.repository'

export class DeleteUserOpportunityUseCase implements UseCase<OpportunityType[]> {
  private opportunityRepository: OpportunityRepositoryInterface

  constructor(opportunityRepository: OpportunityRepositoryInterface) {
    this.opportunityRepository = opportunityRepository
  }

  async execute(payload: { uuids: UUID[] }): Promise<OpportunityType[]> {
    return this.opportunityRepository.delete(payload.uuids)
  }
}
