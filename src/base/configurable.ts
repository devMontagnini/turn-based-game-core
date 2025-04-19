export abstract class Configurable<T> {
  constructor(protected readonly _configuration: T) { }
}