export abstract class AssignableEntity<T> {

  readonly id!: string;
  readonly name!: string;

  assign (data: Partial<T>) {
    this.assign(data);
  }
}