import { randomUUID, UUID } from 'crypto'

export abstract class Entity<T> {
  public readonly uuid: UUID

  constructor(uuid?: UUID) {
    this.uuid = uuid || randomUUID()
  }
}
