import { EngineEvents } from "./engine.events";

export class EventsConnectionConfiguration {
  readonly connectionId!: string;
  readonly defaultIntervalBetweenEvents = 5000;
  readonly emitEventFunction!: (
    to: string | string[],
    event: EngineEvents,
    data?: any,
  ) => boolean;
}