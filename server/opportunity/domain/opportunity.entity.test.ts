import { Opportunity } from './opportunity.entity'
import { randomUUID } from 'crypto'
import { STATE } from './opportunity.type'

describe('Create oppotunity checks', () => {
  it('throws when company is missing', () => {
    // Given
    const payloadWithemptyCompany = {
      company: '',
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

    // When/Then
    expect(() => {
      Opportunity.create(payloadWithemptyCompany)
    }).toThrow(new Error('Missing company'))
  })

  it('should create an opportunity', () => {
    // Given
    const payload = {
      company: 'Random Company',
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

    // When    
    const newOpportunity: Opportunity = Opportunity.create(payload)

    // Then
    expect(newOpportunity).toBeInstanceOf(Opportunity)
  })
})

describe('Reconstitue opportunity checks', () => {
  const applicationDate = {
    uuid: randomUUID(),
    type: 'Application',
    date: '2024-11-11T15:00:00',
    answer: false,
  }

  it('New Opportunity', () => {
    // Given
    const newOpportunity = Opportunity.reconstitute({
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
    })

    // Then
    expect(newOpportunity).toBeInstanceOf(Opportunity)
    expect(newOpportunity.getState()).toEqual(STATE.NEW)
  })
  it('Applied Opportunity', () => {
    // Given
    const appliedOpportunity = Opportunity.reconstitute({
      uuid: randomUUID(),
      company: 'Company Example',
      contact: 'Radom Person',
      location: 'London',
      technologies: 'node.js, Vue 3, TS',
      url: '',
      notes: '',
      history: [{ date: '2024-11-11T15:00:00', modification: 'File initialization' }],
      closed: false,
      dates: [applicationDate],
    })

    // Then
    expect(appliedOpportunity.getState()).toEqual(STATE.APPLIED)
  })
  it('Meeting planned Opportunity', () => {
    // Given
    const plannedOpportunity = Opportunity.reconstitute({
      uuid: randomUUID(),
      company: 'Company Example',
      contact: 'Radom Person',
      location: 'London',
      technologies: 'node.js, Vue 3, TS',
      url: '',
      notes: '',
      history: [{ date: '2024-11-11T15:00:00', modification: 'File initialization' }],
      closed: false,
      dates: [
        applicationDate,
        {
          uuid: randomUUID(),
          type: 'HR interview',
          date: getTomorrowsDate(),
          answer: false,
        },
      ],
    })

    // Then
    expect(plannedOpportunity.getState()).toEqual(STATE.MEETING_PLANNED)
  })
  it('Waiting for an answer Opportunity', () => {
    // Given
    const waitingOpportunity = Opportunity.reconstitute({
      uuid: randomUUID(),
      company: 'Company Example',
      contact: 'Radom Person',
      location: 'London',
      technologies: 'node.js, Vue 3, TS',
      url: '',
      notes: '',
      history: [{ date: '2024-11-11T15:00:00', modification: 'File initialization' }],
      closed: false,
      dates: [
        applicationDate,
        {
          uuid: randomUUID(),
          type: 'HR interview',
          date: '2024-11-12T15:00:00',
          answer: false,
        },
      ],
    })

    // Then
    expect(waitingOpportunity.getState()).toEqual(STATE.WAITING_ANSWER)
  })
  it('Action requiered Opportunity', () => {
    // Given
    const actionOpportunity = Opportunity.reconstitute({
      uuid: randomUUID(),
      company: 'Company Example',
      contact: 'Radom Person',
      location: 'London',
      technologies: 'node.js, Vue 3, TS',
      url: '',
      notes: '',
      history: [{ date: '2024-11-11T15:00:00', modification: 'File initialization' }],
      closed: false,
      dates: [
        applicationDate,
        {
          uuid: randomUUID(),
          type: 'HR interview',
          date: '2024-11-12T15:00:00',
          answer: true,
        },
      ],
    })

    // Then
    expect(actionOpportunity.getState()).toEqual(STATE.ACTION_REQUIRED)
  })
  it('Closed Opportunity', () => {
    // Given
    const closedOpportunity = Opportunity.reconstitute({
      uuid: randomUUID(),
      company: 'Company Example',
      contact: 'Radom Person',
      location: 'London',
      technologies: 'node.js, Vue 3, TS',
      url: '',
      notes: '',
      history: [{ date: '2024-11-11T15:00:00', modification: 'File initialization' }],
      closed: true,
      dates: [applicationDate],
    })

    // Then
    expect(closedOpportunity.getState()).toEqual(STATE.CLOSED)
  })
})

function getTomorrowsDate() {
  let tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  return tomorrow.toISOString().split('T')[0] + 'T' + tomorrow.toLocaleTimeString('fr-FR')
}
