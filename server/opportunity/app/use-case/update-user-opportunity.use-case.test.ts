import { randomUUID } from 'crypto'
import { Opportunity } from '../../domain/opportunity.entity'
import { UUID } from '../../domain/opportunity.type'
import { OpportunityRepositoryInterface } from '../../infra/opportunity.repository'
import { UpdateUserOpportunityUseCase } from './update-user-opportunity.use-case'

class MockOpportunityRepository implements OpportunityRepositoryInterface {
  getAllByUser(): Promise<Opportunity[]> {
    throw new Error('Method not implemented.')
  }
  persist(opportunity: Opportunity): Promise<Opportunity> {
    throw new Error('Method not implemented.')
  }
  delete(uuids: UUID[]): Promise<Opportunity[]> {
    throw new Error('Method not implemented.')
  }
}

describe('UpdateUserOpportunitiesUseCase tests', () => {
  let opportunityRepository: OpportunityRepositoryInterface

  beforeEach(() => {
    jest.clearAllMocks()
    opportunityRepository = new MockOpportunityRepository()
  })

  it('should return an instance of the class', () => {
    // When
    const useCase = new UpdateUserOpportunityUseCase(opportunityRepository)

    // Then
    expect(useCase).toBeInstanceOf(UpdateUserOpportunityUseCase)
  })  

  it('should add the new opportunity and return it', async () => {
    // Given
    const payload = {
      company: 'New Company',
      contact: '',
      location: 'Lyon',
      technologies: 'Express.js, node.js, TS',
      url: '',
      notes: '',
      dates: [
        {
          uuid: randomUUID(),
          type: 'Application',
          date: '2024-11-11T10:00:00.000Z',
          answer: false,
        },
      ],
    }
    const newOpportunity: Opportunity = Opportunity.create(payload)
    const useCase = new UpdateUserOpportunityUseCase(opportunityRepository)
    jest
      .spyOn(opportunityRepository, 'persist')
      .mockImplementation(() => Promise.resolve(newOpportunity))

    // When
    const result = await useCase.execute({ opportunity: newOpportunity })

    // Then
    expect(result).toBeInstanceOf(Opportunity)
    expect(result).toStrictEqual(newOpportunity)
  })
})
