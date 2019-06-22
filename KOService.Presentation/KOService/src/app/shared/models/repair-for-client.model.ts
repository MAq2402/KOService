import { Pricing } from './pricing.model';
import { Activity } from './Activity';
import { ActivityStatus } from '../enums/ActivityStatus';

export class ActivityForClient{
    description: string;
    status: ActivityStatus;
}
export class RepairForClient {
    vehicleRegistrationNumbers: string;
    vehicleBrand: string;
    vehicleModel: string;
    pricing: Pricing;
    activities: ActivityForClient;
}