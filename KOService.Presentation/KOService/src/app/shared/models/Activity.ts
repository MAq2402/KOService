import { ActivityStatus } from '../enums/ActivityStatus'


export class Activity {
    id: string;
    sequenceNumber: number;
    description: string;
    result: string;
    status: ActivityStatus;
    requestTime: string;
    closedTime: string;
    activityTypeId: string;
    repairId: string;
    workerId: string;
}
  