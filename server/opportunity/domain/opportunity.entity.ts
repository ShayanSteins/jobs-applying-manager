import { Entity } from '../../core/entity'
import { UUID } from '../../type'
import {
  ConstructorPayload,
  CreatePayload,
  OpportunityType,
  ReconstitutePayload,
  EventDate,
  OpportunityHistory,
  STATE,
} from './opportunity.type'

export class Opportunity extends Entity<OpportunityType> {
  private state: string
  private company: string
  private contact: string
  private location: string
  private technologies: string
  private url: string
  private notes: string
  private history: OpportunityHistory[]
  private closed: boolean
  private dates: EventDate[] | null

  static create(payload: CreatePayload) {
    if (!payload.company) throw new Error('Missing company')
    return new Opportunity({
      state: STATE.NEW,
      closed: false,
      history: [
        {
          date: new Date().toISOString().split('T')[0] + 'T' + new Date().toLocaleTimeString(),
          modification: 'Création de la piste.',
        },
      ],
      ...payload,
    })
  }

  private constructor(payload: ConstructorPayload, uuid?: UUID) {
    super(uuid)
    this.state = payload.state
    this.company = payload.company
    this.contact = payload.contact
    this.location = payload.location
    this.technologies = payload.technologies
    this.url = payload.url
    this.notes = payload.notes
    this.history = payload.history
    this.closed = payload.closed
    this.dates = payload.dates
  }

  static reconstitute(payload: ReconstitutePayload) {
    return new Opportunity(payload, payload.uuid)
  }

  static computedState(opportunity: OpportunityType): STATE {
    if (opportunity.closed) {
      return STATE.CLOSED
    } else if (!!opportunity.dates && opportunity.dates.length > 0) {
      const lastDate = opportunity.dates.at(-1)
      if (lastDate!.type === 'Application')
        return STATE.APPLIED
      else if (new Date(lastDate!.date) > new Date()) return STATE.MEETING_PLANNED
      else if (new Date(lastDate!.date) < new Date() && !lastDate!.answer)
        return STATE.WAITING_ANSWER
      else return STATE.ACTION_REQUIRED
    }
    return STATE.NEW
  }
}
