export interface UseCase {
  execute(): Promise<void>
}
