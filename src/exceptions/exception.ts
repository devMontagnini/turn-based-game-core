import { ExceptionCodes } from "./exception.codes";

export class Exception extends Error {
  constructor(
    readonly code: ExceptionCodes,
    readonly params?: any, 
    message?: string
  ) {
    super(message);
  }
}