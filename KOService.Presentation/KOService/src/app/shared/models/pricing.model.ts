import { Part } from './pricing-creation.model';

export class Pricing {
    repairId: string;
    labour: number;
    totalCost: number;
    parts: Part[];
}

