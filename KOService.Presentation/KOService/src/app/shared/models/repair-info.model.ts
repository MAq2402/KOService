import { RepairStatus } from '../enums/repair-status';

export class RepairInfo {
    
    description: string;
    result: string;
    status: RepairStatus;
    startDateTime: Date;
    endDateTime: Date;
   
    vehicleRegistrationNumbers: string;
    vehicleBrand: string;
    vehicleModel: string;

    clientName: string;
    clientEmail: string;
    clientPhoneNumber: string;
}
