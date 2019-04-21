
import { RepairStatus } from '../enums/repair-status';
import { Activity } from './Activity';

export class Repair {
    id: string;
    description: string;
    vehicleId: string;
    vehicleRegistrationNumbers: string;
    vehicleBrand: string;
    vehicleModel: string;
    managerId: string;
    result: string;
    status: RepairStatus;
    startDateTime: string;
    endDateTime: string;
    activities: Activity[];
}
