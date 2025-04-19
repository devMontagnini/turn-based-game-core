import { EngineEvents } from "./engine.events";

export class EventsEmiterConfiguration {
  readonly connectionId!: string;
  readonly emitEventFunction!: (
    to: string | string[],
    event: EngineEvents,
    data?: any,
  ) => boolean;
}