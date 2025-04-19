import { Configurable } from '../base/configurable';
import { ActionScheduling } from '../scheduling/action.scheduling';
import { ActionSchedulingStatus } from '../scheduling/action.scheduling.status';
import { ActionSchedulingManagerConfiguration } from './action.scheduling.manager.configuration';

export class ActionSchedulingManager extends Configurable<ActionSchedulingManagerConfiguration> {

  private readonly _scheduledActions: ActionScheduling[] = [];

  constructor (configuration: ActionSchedulingManagerConfiguration) {
    super(configuration);
  }

  private removeScheduledAction(action: ActionScheduling): void {
    const scheduledActionIndex = this._scheduledActions.findIndex(c => c === action);
    this._scheduledActions.splice(scheduledActionIndex, 1);
  }

  private scheduledActionWasCancelled(action: ActionScheduling): void {
    this._scheduledActions
      .filter(c => c.status === ActionSchedulingStatus.Pending)
      .forEach(c => c.advanceTime(action.waitingMilliSecondsToExecute));

    this.removeScheduledAction(action);
  }

  scheduleAction(action: Function, milliSecondsInterval?: number, checkConditionBeforeExecute?: Function): void {
    const lastPendingScheduledAction = this._scheduledActions?.reverse().find(c => c.status === ActionSchedulingStatus.Pending);
    const accumulatedMilliSecondsInterval = lastPendingScheduledAction?.waitingMilliSecondsToExecute || 0;
    
    const scheduleAction = new ActionScheduling({
      action,
      checkConditionBeforeExecute,
      executeAfterMilliSecondsTime: (milliSecondsInterval ?? this._configuration.defaultIntervalBetweenActions) + accumulatedMilliSecondsInterval,
      progressCallback: (status: ActionSchedulingStatus, result?: any) => {
        if (scheduleAction.isFinished()) {
          switch (status) {
            //TODO: talvez adicionar estrutura de possível retry?
            case ActionSchedulingStatus.Cancelled: this.scheduledActionWasCancelled(scheduleAction); break;
            case ActionSchedulingStatus.Error: this._configuration?.scheduledActionErrorCallback?.(result); break;
          }
  
          this.removeScheduledAction(scheduleAction);
        }
      }
    });

    this._scheduledActions.push(scheduleAction);
  }
}