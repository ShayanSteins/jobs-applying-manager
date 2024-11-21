import { Entity } from '../../core/entity'
import {
  ConstructorPayload,
  CreatePayload,
  OpportunityType,
  ReconstitutePayload,
  EventDate,
  OpportunityHistory,
  STATE,
  UUID,
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
  private dates: EventDate[]

  static create(payload: CreatePayload): Opportunity {
    if (!payload.company) throw new Error('Missing company')
    return new Opportunity({
      state: STATE.NEW,
      closed: false,
      history: [
        {
          date: new Date().toISOString().split('T')[0] + 'T' + new Date().toLocaleTimeString(),
          modification: 'Opportunity creation.',
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

  static reconstitute(payload: ReconstitutePayload): Opportunity {
    const state = this.computeState(payload.closed, payload.dates)
    return new Opportunity({ ...payload, state }, payload.uuid)
  }

  private static computeState(isClosed: boolean, dates: EventDate[]): STATE {
    if (isClosed) {
      return STATE.CLOSED
    } else if (!!dates && dates.length > 0) {
      const lastDate = dates.at(-1)
      if (lastDate!.type === 'Application') return STATE.APPLIED
      else if (new Date(lastDate!.date) > new Date()) return STATE.MEETING_PLANNED
      else if (new Date(lastDate!.date) < new Date() && !lastDate!.answer)
        return STATE.WAITING_ANSWER
      else return STATE.ACTION_REQUIRED
    }
    return STATE.NEW
  }

  public getState() {
    return this.state
  }

  public isClosed() {
    return this.closed
  }

  public close() {
    this.closed = true
  }
}
