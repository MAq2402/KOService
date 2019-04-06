import { RepairStatus } from '../enums/repair-status.enum';

export class RepairSubTask {
    id: string;
    sequenceNumber: number;
    description: string;
    result: string;
    status: RepairStatus;
    startDateTime: string;
    endDateTime: string;
    mechanicId: string;
    mechanicName: string;
}
