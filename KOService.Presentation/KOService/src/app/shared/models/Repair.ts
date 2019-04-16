
import { RepairStatus } from '../enums/repair-status';

export class Repair {
    id: string;
    description: string;
    result: string;
    status: RepairStatus;
    statusDisplay: string;
    startDateTime: string;
    endDateTime: string;
    carId: string;
    carBrand: string;
    carNumbers: string;
}