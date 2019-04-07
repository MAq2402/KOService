import { RepairStatus } from '../enums/repair-status.enum';

export class RepairSubTask {
    id: string;
    sequenceNumber: number;
    description: string;
    result: string;
    status: RepairStatus;
    statusDisplay: string;
    startDateTime: string;
    endDateTime: string;
    mechanicId: string;
    mechanicName: string;
}
