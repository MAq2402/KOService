import { ActivityStatus } from '../enums/ActivityStatus'


export class Activity {
    id: string;
    sequenceNumber: number;
    description: string;
    result: string;
    status: ActivityStatus;
    startDataTime: string;
    closedTime: string;
    activityTypeId: string;
    requestId: string;
    workerId: string;
    vehicleRegistrationNumbers: string;
    vehicleBrand: string;
}
  