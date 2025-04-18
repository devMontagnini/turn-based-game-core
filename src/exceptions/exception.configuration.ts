import { ExceptionCodes } from "./exception.codes";

export class ExceptionConfiguration {
  readonly params?: any;
  readonly code!: ExceptionCodes;
  readonly publicMessage?: string;
  readonly internalMessage?: string;
}