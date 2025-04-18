import { Configurable } from "../base/configurable";
import { ExceptionConfiguration } from "./exception.configuration";

export class Exception extends Configurable<ExceptionConfiguration> {

  constructor(configuration: ExceptionConfiguration) {
    super(configuration);
    if (this.configuration?.internalMessage?.trim()) {
      this.logInternalMessage();
    }
  }

  protected logInternalMessage(): void {
    console.error('INTERNAL_MESSAGE_EXCEPTION::', this.configuration.internalMessage);
  }
}