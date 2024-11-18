import { randomUUID } from 'crypto'
import { Opportunity } from '../../domain/opportunity.entity'
import { UUID } from '../../domain/opportunity.type'
import { OpportunityRepositoryInterface } from '../../infra/opportunity.repository'
import { GetUserOpportunitiesUseCase } from './get-user-opportunities.use-case'

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

const uuid1 = randomUUID()
const uuid2 = randomUUID()
const expectedResults: Opportunity[] = [
  Opportunity.reconstitute({
    uuid: uuid1,
    company: 'Random Company',
    contact: '',
    location: 'Nantes',
    technologies: 'Vue 3, node.js, TS',
    url: '',
    notes: '',
    history: [{ date: '2024-11-11T22:50:08', modification: 'Opportunity creation.' }],
    closed: false,
    dates: [],
  }),
  Opportunity.reconstitute({
    uuid: uuid2,
    company: 'Another Company',
    contact: '',
    location: 'Paris',
    technologies: 'React, TS',
    url: '',
    notes: '',
    history: [{ date: '2024-11-11T15:37:25', modification: 'Opportunity creation.' }],
    closed: false,
    dates: [
      {
        uuid: randomUUID(),
        type: 'Application',
        date: '2024-11-11T10:00:00.000Z',
        answer: true,
      },
      {
        uuid: randomUUID(),
        type: 'HR Interview',
        date: '2024-12-18T09:00:00.000Z',
        answer: false,
      },
    ],
  }),
]

describe('GetUserOpportunitiesUseCase tests', () => {
  let opportunityRepository: OpportunityRepositoryInterface

  beforeEach(() => {
    jest.clearAllMocks()
    opportunityRepository = new MockOpportunityRepository()
  })

  it('should return an instance of the class', () => {
    // When
    const useCase = new GetUserOpportunitiesUseCase(opportunityRepository)

    // Then
    expect(useCase).toBeInstanceOf(GetUserOpportunitiesUseCase)
  })

  it('should return an array of Opportunity', async () => {
    // Given
    const useCase = new GetUserOpportunitiesUseCase(opportunityRepository)
    jest.spyOn(opportunityRepository, 'getAllByUser').mockImplementation(() => Promise.resolve(expectedResults))

    // When
    const result = await useCase.execute()

    // Then
    expect(result.length).toEqual(2)
    expect(result).toStrictEqual(expectedResults)
  })
})
