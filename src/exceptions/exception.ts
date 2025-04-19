import { Logger } from "../base/logger";
import { Configurable } from "../base/configurable";
import { ExceptionConfiguration } from "./complements/exception.configuration";

export class Exception extends Configurable<ExceptionConfiguration> {
  constructor(configuration: ExceptionConfiguration) {
    super(configuration);
    if (this._configuration?.internalMessage?.trim()) {
      Logger.logInternalError(this._configuration.internalMessage!);
    }
  }
}