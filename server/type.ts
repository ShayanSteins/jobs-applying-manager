export type OpportunityHistory = {
  date: string
  modification: string
}

export type EventDate = {
  id: string,
  type: string,
  date: string,
  retour: boolean
}

export type Opportunity = {
  id: string
  state: string
  company: string
  contact: string
  location: string
  technologies: string
  url: string
  notes: string
  history: [OpportunityHistory]
  closed: boolean
  dates: [EventDate]
}

export type UUID = string;
