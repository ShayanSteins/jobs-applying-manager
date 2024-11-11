import { UUID } from '../type'
import { randomUUID } from 'crypto'

export abstract class Entity<T> {
  public readonly uuid: UUID

  constructor(uuid?: UUID) {
    this.uuid = uuid || randomUUID()
  }
}
