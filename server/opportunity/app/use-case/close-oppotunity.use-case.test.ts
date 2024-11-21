import { MockOpportunityRepository, reconstituteOpportunityPayload } from '../../../utils/mocks'
import { Opportunity } from '../../domain/opportunity.entity'
import { OpportunityRepositoryInterface } from '../../infra/opportunity.repository'
import { CloseOpportunityUseCase } from './close-oppotunity.use-case'

describe('UpdateUserOpportunitiesUseCase tests', () => {
  let opportunityRepository: OpportunityRepositoryInterface

  beforeEach(() => {
    jest.clearAllMocks()
    opportunityRepository = new MockOpportunityRepository()
  })
  it('should return an instance of the class', () => {
    // Given
    const useCase = new CloseOpportunityUseCase(opportunityRepository)

    // Then
    expect(useCase).toBeInstanceOf(CloseOpportunityUseCase)
  })

  it('should close the opportunity', () => {
    // Given
    const opportunity = Opportunity.reconstitute(reconstituteOpportunityPayload)
    // When
    opportunity.close()
    // Then
    expect(opportunity.isClosed()).toBe(true)
  })
})
