import { ActionSchedulingStatus } from '../enums/action.scheduling.status';
import { NotImplementedException } from '../../exceptions/not-implemented.exception';

export class ActionSchedulingConfiguration {
  readonly checkConditionBeforeExecute?: Function;
  readonly executeAfterMilliSecondsTime?: number;
  readonly progressCallback?: (status: ActionSchedulingStatus, result?: any) => void;
  readonly action: Function = () => { throw new NotImplementedException('Action scheduling function not implemented.'); }; 
}