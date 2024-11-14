import crypto from 'crypto'

export type UUID = crypto.UUID;

export interface OpportunityType {
  uuid: UUID
  state: STATE
  company: string
  contact: string
  location: string
  technologies: string
  url: string
  notes: string
  history: OpportunityHistory[]
  closed: boolean
  dates: EventDate[]
}

export type OpportunityHistory = {
  date: string
  modification: string
}

export type EventDate = {
  uuid: UUID
  type: string
  date: string
  answer: boolean
}

export type CreatePayload = Omit<OpportunityType, 'uuid' | 'history' | 'state' | 'closed'>
export type ReconstitutePayload = OpportunityType
export type ConstructorPayload = Omit<OpportunityType, 'uuid'>

export enum STATE {
  NEW = 'New',
  APPLIED = 'Applied',
  MEETING_PLANNED = 'Meeting planned',
  WAITING_ANSWER = 'Waiting for an answer',
  ACTION_REQUIRED = 'Action required',
  CLOSED = 'Closed',
}
