import { Exception } from "./exception";
import { ExceptionCodes } from "./enums/exception.codes";

export class NotImplementedException extends Exception {
  constructor(internalMessage?: string) {
    super({
      internalMessage,
      code: ExceptionCodes.InternalErrorException,
    });
  }
}