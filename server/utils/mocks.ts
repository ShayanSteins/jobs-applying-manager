import { randomUUID, UUID } from "crypto"
import { Opportunity } from "../opportunity/domain/opportunity.entity"
import { OpportunityRepositoryInterface } from "../opportunity/infra/opportunity.repository"

export class MockOpportunityRepository implements OpportunityRepositoryInterface {
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

export const reconstituteOpportunityPayload = {
    uuid: randomUUID(),
    company: 'Company Example',
    contact: 'Radom Person',
    location: 'London',
    technologies: 'node.js, Vue 3, TS',
    url: '',
    notes: '',
    history: [{ date: '2024-11-11T15:00:00', modification: 'File initialization' }],
    closed: false,
    dates: [],
  }
