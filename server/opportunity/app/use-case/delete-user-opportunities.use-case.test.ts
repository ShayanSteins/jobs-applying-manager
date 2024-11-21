import { randomUUID } from 'crypto'
import { Opportunity } from '../../domain/opportunity.entity'
import { OpportunityRepositoryInterface } from '../../infra/opportunity.repository'
import { DeleteUserOpportunitiesUseCase } from './delete-user-opportunities.use-case'
import { MockOpportunityRepository } from '../../../utils/mocks'

const uuid1 = randomUUID()
const uuid2 = randomUUID()
const uuid3 = randomUUID()
const opp1 = Opportunity.reconstitute({
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
})
const opp2 = Opportunity.reconstitute({
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
})
const opp3 = Opportunity.reconstitute({
  uuid: uuid3,
  company: 'To be deleted',
  contact: '',
  location: '',
  technologies: '',
  url: '',
  notes: '',
  history: [{ date: '2024-11-11T22:50:08', modification: 'Opportunity creation.' }],
  closed: false,
  dates: [],
})
const fullDb = [opp1, opp2, opp3]
const expectedResults: Opportunity[] = [opp1, opp2]

describe('GetUserOpportunitiesUseCase tests', () => {
  let opportunityRepository: OpportunityRepositoryInterface

  beforeEach(() => {
    jest.clearAllMocks()
    opportunityRepository = new MockOpportunityRepository()
  })

  it('should return an instance of the class', () => {
    // When
    const useCase = new DeleteUserOpportunitiesUseCase(opportunityRepository)

    // Then
    expect(useCase).toBeInstanceOf(DeleteUserOpportunitiesUseCase)
  })

  it('should delete the opportunity, and return the others', async () => {
    // Given
    const useCase = new DeleteUserOpportunitiesUseCase(opportunityRepository)
    jest
      .spyOn(opportunityRepository, 'delete')
      .mockImplementation(() => Promise.resolve(expectedResults))

    // When
    const result = await useCase.execute({uuids: [uuid3]})

    // Then
    expect(result.length).toEqual(2)
    expect(result).toStrictEqual(expectedResults)
  })
})
