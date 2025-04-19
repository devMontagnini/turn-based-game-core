import { Logger } from '../base/logger';
import { Configurable } from '../base/configurable';
import { ActionSchedulingStatus } from './action.scheduling.status';
import { ActionSchedulingConfiguration } from './action.scheduling.configuration';

export class ActionScheduling extends Configurable<ActionSchedulingConfiguration> {

  private scheduledAt!: number; 
  private scheduleTimeout?: NodeJS.Timeout;
  private status: ActionSchedulingStatus = ActionSchedulingStatus.Pending;
  
  constructor (configuration: ActionSchedulingConfiguration) {
    super(configuration);
    this.schedule(configuration.executeAfterMilliSecondsTime ?? 0);
  }

  private schedule(milliSecondsTimeToWait: number): void {
    this.scheduledAt = Date.now();
    this.status = ActionSchedulingStatus.Pending;
    this.scheduleTimeout = setTimeout(() => this.execute(), milliSecondsTimeToWait ?? 0);
  }

  private execute(): void {
    try {
      this.updateStatus(ActionSchedulingStatus.Started);

      const { checkConditionBeforeExecute } = this.configuration;
      if (checkConditionBeforeExecute && !checkConditionBeforeExecute()) {
        this.updateStatus(ActionSchedulingStatus.Cancelled);
        return;
      }

      this.configuration.action();
      this.updateStatus(ActionSchedulingStatus.Complete);
    }
    catch (error) {
      Logger.logInternalError('ACTION_SCHEDULE_ERROR', error);
      this.updateStatus(ActionSchedulingStatus.Error, error);
    }
  }

  private updateStatus(status: ActionSchedulingStatus, result?: any): void {
    this.status = status;
    this.configuration.progressCallback?.(status, result);
  }

  advanceTime(milliSeconds: number): void {
    if (this.status !== ActionSchedulingStatus.Pending) {
      return; 
    }

    clearInterval(this.scheduleTimeout);
    const advancedScheduleInterval = (Date.now() - this.scheduledAt) - milliSeconds;
    const milliSecondsTimeToWait = advancedScheduleInterval > 0
      ? advancedScheduleInterval
      : 0;

    this.schedule(milliSecondsTimeToWait);
  }

  isFinished(): boolean {
    return [
      ActionSchedulingStatus.Error, 
      ActionSchedulingStatus.Complete,
      ActionSchedulingStatus.Cancelled, 
    ].includes(this.status);
  }
}