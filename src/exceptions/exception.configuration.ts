import { ExceptionCodes } from "./exception.codes";

export class ExceptionConfiguration {
  readonly parameters?: any;
  readonly code!: ExceptionCodes;
  readonly publicMessage?: string;
  readonly internalMessage?: string;
}