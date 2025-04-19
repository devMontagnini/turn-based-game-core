export abstract class AssignableEntity<T> {

  readonly id!: string;
  readonly name!: string;

  constructor (data: Partial<T>) {
    Object.assign(this, data);
  }
}