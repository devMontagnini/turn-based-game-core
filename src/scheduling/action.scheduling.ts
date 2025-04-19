import { Logger } from '../base/logger';
import { Configurable } from '../base/configurable';
import { ActionSchedulingStatus } from './action.scheduling.status';
import { ActionSchedulingConfiguration } from './action.scheduling.configuration';

export class ActionScheduling extends Configurable<ActionSchedulingConfiguration> {

  private _scheduledAt!: number; 
  private _scheduleTimeout?: NodeJS.Timeout;

  private _waitingMilliSecondsToExecute!: number;
  get waitingMilliSecondsToExecute(): number {
    return this._waitingMilliSecondsToExecute;
  }

  private _status: ActionSchedulingStatus = ActionSchedulingStatus.Pending;
  get status(): ActionSchedulingStatus {
    return this._status;
  }
  
  constructor (configuration: ActionSchedulingConfiguration) {
    super(configuration);
    this.schedule(configuration.executeAfterMilliSecondsTime ?? 0);
  }

  private schedule(milliSecondsTimeToWait: number): void {
    this._scheduledAt = Date.now();
    this._status = ActionSchedulingStatus.Pending;
    this._waitingMilliSecondsToExecute = milliSecondsTimeToWait;
    this._scheduleTimeout = setTimeout(() => this.execute(), milliSecondsTimeToWait ?? 0);
  }

  private execute(): void {
    try {
      this.updateStatus(ActionSchedulingStatus.Started);

      const { checkConditionBeforeExecute } = this._configuration;
      if (checkConditionBeforeExecute && !checkConditionBeforeExecute()) {
        this.updateStatus(ActionSchedulingStatus.Cancelled);
        return;
      }

      this._configuration.action();
      this.updateStatus(ActionSchedulingStatus.Complete);
    }
    catch (error) {
      Logger.logInternalError('ACTION_SCHEDULE_ERROR', error);
      this.updateStatus(ActionSchedulingStatus.Error, error);
    }
  }

  private updateStatus(status: ActionSchedulingStatus, result?: any): void {
    this._status = status;
    this._configuration.progressCallback?.(status, result);
  }

  advanceTime(milliSeconds: number): void {
    if (this._status !== ActionSchedulingStatus.Pending) {
      return; 
    }

    clearInterval(this._scheduleTimeout);
    const advancedScheduleInterval = (Date.now() - this._scheduledAt) - milliSeconds;
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