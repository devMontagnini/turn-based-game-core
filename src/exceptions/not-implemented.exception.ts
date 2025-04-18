import { Exception } from "./exception";
import { ExceptionCodes } from "./exception.codes";

export class NotImplementedException extends Exception {
  constructor(internalMessage?: string) {
    super({
      internalMessage,
      code: ExceptionCodes.InternalErrorException,
    });
  }
}