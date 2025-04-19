export class ActionSchedulingManagerConfiguration {
  readonly defaultIntervalBetweenActions = 5000;
  readonly scheduledActionErrorCallback?: (error: any) => void;
}