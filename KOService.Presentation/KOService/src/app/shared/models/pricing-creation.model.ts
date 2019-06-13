
export interface Part{
    name: string,
    manufacturer: string,
    manufacturerId: string,
    price: number
}

export class PricingCreation{
    repairId: string;
    labour: number;
    parts: Part[];
}