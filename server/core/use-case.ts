export interface UseCase<T> {
  execute(payload: {}): Promise<T>
}
