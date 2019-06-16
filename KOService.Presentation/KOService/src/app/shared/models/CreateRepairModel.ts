import { RepairForCreation } from './RepairForCreation';
import { Vehicle } from './Vehicle';
import { Client } from './Client';

export class CreateRepairModel {
    repair: RepairForCreation;
    menagerId: string;
    vehicle: Vehicle;
    client: Client;

    constructor() {
        this.repair = new RepairForCreation;
        this.vehicle = new Vehicle;
        this.client = new Client;
    }
}
