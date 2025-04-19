import { Logger } from '../base/logger';
import { EngineEvents } from './engine.events';
import { Configurable } from '../base/configurable';
import { Exception } from '../exceptions/exception';
import { EventsEmiterConfiguration } from './events.emiter.configuration';

export abstract class EventsEmiter extends Configurable<EventsEmiterConfiguration> {

  constructor (configuration: EventsEmiterConfiguration) {
    super(configuration);
  }

  emit(event: EngineEvents, data?: any): void {
    this._configuration.emitEventFunction(this._configuration.connectionId, event, data);
  }

  emitError(error: Exception): void {
    Logger.logInternalError('EMITTING_ERROR_EVENT', error);
    this.emit(EngineEvents.NoticeThatThrownExceptionError, error);
  }
}